import FileOperationsPage from '../pages/FileOperationsPage';

describe('XLSM / XLSX Binary Excel Spreadsheet Reading Tests', () => {
  const excelFilePath = 'cypress/fixtures/sampleData.xlsm';

  it('should read binary .xlsm file and parse worksheet rows into JSON array', () => {
    FileOperationsPage.readExcelData(excelFilePath, 'Sheet1').then((rows) => {
      // Assert total rows in Excel worksheet
      expect(rows).to.be.an('array').with.lengthOf(5);

      // Verify specific row values and numeric data types
      const row1 = rows[0];
      expect(row1.id).to.eq(101);
      expect(row1.employee_name).to.eq('John Doe');
      expect(row1.department).to.eq('Engineering');
      expect(row1.salary).to.eq(95000);
      expect(row1.status).to.eq('Active');
    });
  });

  it('should perform payroll aggregation on .xlsm spreadsheet data', () => {
    FileOperationsPage.readExcelData(excelFilePath, 'Sheet1').then((rows) => {
      // Calculate total company payroll
      const totalPayroll = rows.reduce((acc, row) => acc + Number(row.salary), 0);
      expect(totalPayroll).to.eq(427000);
    });
  });

  it('should validate worksheet column headers and active record filtering', () => {
    FileOperationsPage.readExcelData(excelFilePath, 'Sheet1').then((rows) => {
      // Validate expected keys exist on row object
      const keys = Object.keys(rows[0]);
      expect(keys).to.include.members(['id', 'employee_name', 'department', 'salary', 'status']);

      // Filter active employees
      const activeEmployees = rows.filter((r) => r.status === 'Active');
      expect(activeEmployees).to.have.lengthOf(4);
    });
  });
});
