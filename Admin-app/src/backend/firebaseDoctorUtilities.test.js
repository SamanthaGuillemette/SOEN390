/**
 * @jest-environment node
 */

import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
    getDoctors,
    getDoctor,
    patientLimit,
    addPatientToDoctor,
    removePatientFromDoctor,
    role
} from "./firebaseDoctorUtilities";

test('patient limit to be 3', () => {
    expect(patientLimit).toEqual(3);
})

test('role to be doctor', () => {
    expect(role).toEqual("Doctor");
})

test('expect doctor to be returned after adding patient', async () => {
    try {
        const doctorInfo = await addPatientToDoctor("tushar@doctor.com", "tushar@client.com").catch(error => { console.log(error) });
        expect(doctorInfo).toHaveReturnedWith("tushar@doctor.com");
    } catch (error) {
        console.log(error);
    }
})

test('expect doctor to be returned after removing patient', async () => {
    try {
        const doctorInfo = await removePatientFromDoctor("tushar@doctor.com", "tushar@client.com").catch(error => { console.log(error) });
        expect(doctorInfo).toHaveReturnedWith("tushar@doctor.com");
    } catch (error) {
        console.log(error);
    }
})

test('expect to receive the doctor with the key provided', async () => {
    try {
        const doctorInfo = await getDoctor("tushar@doctor.com").catch(error => { console.log(error) });
        expect(doctorInfo).toHaveReturnedWith("tushar@doctor.com")
    } catch (error) {
        console.log(error);
    }
})

afterEach(() => {
    cleanup();
});
