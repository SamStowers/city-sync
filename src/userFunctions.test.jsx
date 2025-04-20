import { getUserAdminFromUID, getUserReportPermission, setUserAdmin, unitTestingTest } from './userFunctions';

// const userFunctions = require('./userFunctions');

test('framework is working', () => {
    // Just a dummy function that always returns 8
    expect(unitTestingTest().toBe(8));
});

test('get admin status for guest', () => {
    expect(getUserAdminFromUID('0').toBe(false));
});

test('get admin status for admin', () => {
    expect(getUserAdminFromUID('TIppRt43ubgoIGCBJXsExQv6Q7V2').toBe(true));
});

test('get admin status for invalid input', () => {
    expect(getUserAdminFromUID(null).toBe(false));
})

test('get report status', () => {
    // Should default to guest, who does not have permission
    expect(getUserReportPermission().toBe(false));
});

test('invalid input for give admin permission', () => {
    expect(setUserAdmin('a', '0')).toThrow();
});