import FileOperationsPage from '../pages/FileOperationsPage';

describe('CSV File Reading & Data Parsing Tests', () => {
  const csvFilePath = 'cypress/fixtures/sampleData.csv';

  it('should read CSV file and parse rows into structured JSON array', () => {
    FileOperationsPage.readCsvData(csvFilePath).then((rows) => {
      // Assert record count
      expect(rows).to.be.an('array').with.lengthOf(5);

      // Verify first record details
      const firstRecord = rows[0];
      expect(firstRecord.id).to.eq('101');
      expect(firstRecord.employee_name).to.eq('John Doe');
      expect(firstRecord.department).to.eq('Engineering');
      expect(firstRecord.salary).to.eq('95000');
      expect(firstRecord.status).to.eq('Active');
    });
  });

  it('should filter CSV records by department and perform data calculations', () => {
    FileOperationsPage.readCsvData(csvFilePath).then((rows) => {
      // Filter records in Engineering department
      const engDept = rows.filter((r) => r.department === 'Engineering');
      expect(engDept).to.have.lengthOf(2);

      // Calculate total salary for Engineering department
      const totalSalary = engDept.reduce((sum, r) => sum + parseInt(r.salary), 0);
      expect(totalSalary).to.eq(200000);
    });
  });

  it('should verify active versus inactive employee statuses in CSV file', () => {
    FileOperationsPage.readCsvData(csvFilePath).then((rows) => {
      const activeCount = rows.filter((r) => r.status === 'Active').length;
      const inactiveCount = rows.filter((r) => r.status === 'Inactive').length;

      expect(activeCount).to.eq(4);
      expect(inactiveCount).to.eq(1);
    });
  });
});
