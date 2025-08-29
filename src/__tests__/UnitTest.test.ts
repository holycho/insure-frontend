import commonService from 'app/core/services/commonService';

describe('測試 commonService.ts', () => {
  it('測試 convertToTWDate()', () => {
    expect(commonService.convertToTWDate('2025/01/01')).toBe('114/01/01');
  });

  it('測試 displayTWDate2()', () => {
    expect(commonService.displayTWDate2('114/01/01')).toBe('114年01月01日');
  })

  it('測試 convertToADDate()', () => {
    expect(commonService.convertToADDate('114/01/01')).toBe('2025/01/01');
  });

  it('測試 displayTWYear()', () => {
    expect(commonService.displayTWYear('2025/01/01')).toBe('民國2025年');
  });

  it('測試 thousandFormat()', () => {
    expect(commonService.thousandFormat('1000000')).toBe('1,000,000');
    expect(commonService.thousandFormat('1000')).toBe('1,000');
    expect(commonService.thousandFormat('100元')).toBe('100元');
  })
});