/**
 * @jest-environment node
 */

import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
    getPatient,
    togglePriorityFlag,
    setAssignedDoctor,
    isValidPatientId,
    setStatus,
    setReviewed,
    tableName,
} from "./firebasePatientUtilities"

test('expect tablename to be Client', () => {
    expect(tableName).toEqual("Client")
})

test('expect patient email to be the same as the key', async () => {
    try {
        const patientData = await getPatient("jesttest@jest.com").catch(error => { console.log(error) });
        expect(patientData.email).toEqual("jesttest@jest.com")
    } catch (error) {
        console.log(error);
    }
})

test('expect patient to be null if wrong key is provided', async () => {
    try {
        const patientData = await isValidPatientId("novalidpatient").catch(error => { console.log(error) });
        expect(patientData).toEqual(false);
    } catch (error) {
        console.log(error);
    }
})

test('expect patient flag to be changed and email to be returned', async () => {
    try {
        const patientData = await togglePriorityFlag("jesttest@jest.com").catch(error => { console.log(error) });
        expect(patientData.email).toEqual("jesttest@jest.com")
    } catch (error) {
        console.log(error);
    }
})

test('expect a value to be returned once reviewed', async () => {
    try {
        const patientReviewed = await setReviewed("jesttest@jest.com", "Ex16AHdCZk6vqUCqOdzf").catch(error => { console.log(error) })
        expect(patientReviewed.value).toHaveReturned();
    } catch (error) {
        console.log(error);
    }
})

test('expect doctor to be set', async () => {
    try {
        const patientInfo = await setAssignedDoctor('jesttest@jest.com', 'test@admin.com').catch(error => { console.log(error) });
        expect(patientInfo.assignedDoctor).toEqual("test@admin.com");
    } catch (error) {
        console.log(error);
    }
})

test('expect status to be set', async () => {
    try {
        const patientInfo = await setStatus('jesttest@jest.com', '1').catch(error => { console.log(error) });
        expect(patientInfo.status).toEqual('1');
    } catch (error) {
        console.log(error);
    }
})

afterEach(() => {
    cleanup();
});
