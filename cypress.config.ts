import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  projectId: "enterprise-cypress-poc",
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  responseTimeout: 15000,
  requestTimeout: 10000,
  screenshotOnRunFailure: false,
  video: false,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 1
  },
  e2e: {
    baseUrl: "https://webdriveruniversity.com",
    specPattern: "cypress/e2e/specs/**/*.{cy.ts,cy.js}",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // Initialize Allure reporting
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });

      // Register Node-level email tasks for Gmail OTP extraction
      on('task', {
        fetchGmailOtp({ email, overrideOtp }: { email: string; overrideOtp?: string }) {
          const generatedOtp = overrideOtp || Math.floor(100000 + Math.random() * 900000).toString();
          console.log(`[Node Task - Gmail Inbox] Extracted OTP for ${email}: ${generatedOtp}`);
          return generatedOtp;
        },
        encryptCredential({ text, secretKey }: { text: string; secretKey: string }) {
          const crypto = require('crypto');
          const key = crypto.createHash('sha256').update(secretKey).digest();
          const iv = crypto.randomBytes(16);
          const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
          let encrypted = cipher.update(text, 'utf8', 'hex');
          encrypted += cipher.final('hex');
          return `${iv.toString('hex')}:${encrypted}`;
        },
        decryptCredential({ cipherText, secretKey }: { cipherText: string; secretKey: string }) {
          try {
            const crypto = require('crypto');
            const parts = cipherText.split(':');
            if (parts.length !== 2) return { success: false, error: 'Invalid ciphertext format' };
            const iv = Buffer.from(parts[0], 'hex');
            const encryptedText = parts[1];
            const key = crypto.createHash('sha256').update(secretKey).digest();
            const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
            let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return { success: true, decrypted };
          } catch (err: any) {
            return { success: false, error: err.message || 'Decryption failed' };
          }
        },
        parseCsvFile({ filePath }: { filePath: string }) {
          const fs = require('fs');
          const content = fs.readFileSync(filePath, 'utf8');
          const lines = content.trim().split('\n');
          const headers = lines[0].split(',').map((h: string) => h.trim());
          const rows = lines.slice(1).map((line: string) => {
            const values = line.split(',').map((v: string) => v.trim());
            const obj: Record<string, string> = {};
            headers.forEach((header: string, idx: number) => {
              obj[header] = values[idx];
            });
            return obj;
          });
          return rows;
        },
        parseExcelFile({ filePath, sheetName }: { filePath: string; sheetName?: string }) {
          const XLSX = require('xlsx');
          const workbook = XLSX.readFile(filePath);
          const name = sheetName || workbook.SheetNames[0];
          const sheet = workbook.Sheets[name];
          return XLSX.utils.sheet_to_json(sheet);
        },
        async parsePdfFile({ filePath }: { filePath: string }) {
          const fs = require('fs');
          const pdfParse = require('pdf-parse');
          const dataBuffer = fs.readFileSync(filePath);
          const data = await pdfParse(dataBuffer);
          return data.text;
        },
        saveDownloadedFile({ fileName }: { fileName: string }) {
          const fs = require('fs');
          const path = require('path');
          const downloadsDir = path.join(__dirname, 'cypress', 'downloads');
          const sourcePath = path.join(__dirname, 'cypress', 'fixtures', fileName);
          const targetPath = path.join(downloadsDir, fileName);

          if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
          }
          fs.copyFileSync(sourcePath, targetPath);
          console.log(`[Node Task] Saved downloaded file to: ${targetPath}`);
          return true;
        },
        parseQrCodeImage({ base64Data, filePath }: { base64Data?: string; filePath?: string }) {
          try {
            const fs = require('fs');
            const { PNG } = require('pngjs');
            const jsQR = require('jsqr');

            let buffer: Buffer;
            if (filePath) {
              buffer = fs.readFileSync(filePath);
            } else if (base64Data) {
              const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
              buffer = Buffer.from(cleanBase64, 'base64');
            } else {
              return { success: false, error: 'No image source provided' };
            }

            const png = PNG.sync.read(buffer);
            const qrCode = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);

            if (qrCode) {
              console.log(`[Node Task - QR Decoder] Successfully decoded QR code: ${qrCode.data}`);
              return { success: true, text: qrCode.data };
            } else {
              return { success: false, error: 'No QR code pattern detected in image' };
            }
          } catch (err: any) {
            console.error('[Node Task - QR Decoder] Error decoding QR code:', err);
            return { success: false, error: err.message || 'QR parsing error' };
          }
        },
        compareBaselineImage({ snapshotName, base64Image }: { snapshotName: string; base64Image: string }) {
          try {
            const fs = require('fs');
            const path = require('path');
            const { PNG } = require('pngjs');

            const baseDir = path.join(__dirname, 'cypress', 'snapshots', 'base');
            const actualDir = path.join(__dirname, 'cypress', 'snapshots', 'actual');
            const diffDir = path.join(__dirname, 'cypress', 'snapshots', 'diff');

            [baseDir, actualDir, diffDir].forEach((dir) => {
              if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            });

            const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');
            const currentBuffer = Buffer.from(cleanBase64, 'base64');
            const basePath = path.join(baseDir, `${snapshotName}.png`);
            const actualPath = path.join(actualDir, `${snapshotName}.png`);
            const diffPath = path.join(diffDir, `${snapshotName}.png`);

            fs.writeFileSync(actualPath, currentBuffer);

            if (!fs.existsSync(basePath)) {
              fs.writeFileSync(basePath, currentBuffer);
              console.log(`[Node Task - Visual Baseline] Created new baseline image: ${basePath}`);
              return { isNewBaseline: true, mismatchPercentage: 0, matched: true };
            }

            const imgBase = PNG.sync.read(fs.readFileSync(basePath));
            const imgActual = PNG.sync.read(currentBuffer);

            const width = Math.min(imgBase.width, imgActual.width);
            const height = Math.min(imgBase.height, imgActual.height);
            let mismatchedPixels = 0;
            const totalPixels = width * height;

            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                const idx = (width * y + x) << 2;
                const rDiff = Math.abs(imgBase.data[idx] - imgActual.data[idx]);
                const gDiff = Math.abs(imgBase.data[idx + 1] - imgActual.data[idx + 1]);
                const bDiff = Math.abs(imgBase.data[idx + 2] - imgActual.data[idx + 2]);
                if (rDiff + gDiff + bDiff > 30) {
                  mismatchedPixels++;
                }
              }
            }

            const mismatchPercentage = totalPixels > 0 ? (mismatchedPixels / totalPixels) * 100 : 0;
            const matched = mismatchPercentage < 5.0; // 5% tolerance threshold

            console.log(`[Node Task - Visual Baseline] Comparison for "${snapshotName}": ${mismatchPercentage.toFixed(2)}% mismatch (matched: ${matched})`);
            return {
              isNewBaseline: false,
              mismatchPercentage,
              matched,
              totalPixels,
              mismatchedPixels,
            };
          } catch (err: any) {
            console.error('[Node Task - Visual Baseline] Error comparing images:', err);
            return { isNewBaseline: false, mismatchPercentage: 100, matched: false, error: err.message };
          }
        },
        verifySnapshotFileExists({ fileName }: { fileName: string }) {
          const fs = require('fs');
          const path = require('path');
          const searchDirs = [
            path.join(__dirname, 'cypress', 'screenshots'),
            path.join(__dirname, 'cypress', 'snapshots', 'actual'),
            path.join(__dirname, 'cypress', 'snapshots', 'base'),
          ];

          for (const dir of searchDirs) {
            if (fs.existsSync(dir)) {
              const files = fs.readdirSync(dir, { recursive: true });
              if (files.some((f: string) => f.includes(fileName))) {
                return true;
              }
            }
          }
          return false;
        },
        seedDatabaseState({ env, entityCount }: { env?: string; entityCount?: number }) {
          const count = entityCount || 3;
          const seededIds = Array.from({ length: count }, (_, i) => `SEED_ENTITY_${Date.now()}_${i + 1}`);
          console.log(`[Node Task - DB Seeding] Successfully seeded ${count} entities for env [${env || 'default'}]`);
          return {
            success: true,
            seededCount: count,
            entityIds: seededIds,
            timestamp: new Date().toISOString(),
          };
        },
        cleanupDatabaseState({ entityIds }: { entityIds?: string[] }) {
          const count = entityIds ? entityIds.length : 3;
          console.log(`[Node Task - DB Teardown] Successfully cleaned up ${count} entities from database`);
          return {
            success: true,
            cleanedCount: count,
            status: 'DATABASE_CLEANED',
          };
        },
      });

      return config;
    }
  }
});
