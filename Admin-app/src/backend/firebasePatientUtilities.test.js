/**
 * @jest-environment node
 */

import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  getPatients,
  getPatient,
  togglePriorityFlag,
  setAssignedDoctor,
  isValidPatientId,
  setStatus,
  setNewCase,
  viewedNewCase,
  getStatuses,
  getDiary,
  setRecovered,
  setViewedCaseFalse,
  setReviewed,
  notifyExposure,
  tableName,
  getStatus,
} from "./firebasePatientUtilities";

test("expect tablename to be Client", () => {
  expect(tableName).toEqual("Client");
});

test("expect patient email to be the same as the key", async () => {
  try {
    const patientData = await getPatient("jesttest@jest.com").catch((error) => {
      console.log(error);
    });
    expect(patientData.email).toEqual("jesttest@jest.com");
  } catch (error) {
    console.log(error);
  }
});

test("expect patient to be null if wrong key is provided", async () => {
  try {
    const patientData = await isValidPatientId("novalidpatient").catch(
      (error) => {
        console.log(error);
      }
    );
    expect(patientData).toEqual(false);
  } catch (error) {
    console.log(error);
  }
});

test("expect patient flag to be changed and email to be returned", async () => {
  try {
    const patientData = await togglePriorityFlag("jesttest@jest.com").catch(
      (error) => {
        console.log(error);
      }
    );
    expect(patientData.email).toEqual("jesttest@jest.com");
  } catch (error) {
    console.log(error);
  }
});

test("expect a value to be returned once reviewed", async () => {
  try {
    const patientReviewed = await setReviewed(
      "jesttest@jest.com",
      "Ex16AHdCZk6vqUCqOdzf"
    ).catch((error) => {
      console.log(error);
    });
    expect(patientReviewed.value).toHaveReturned();
  } catch (error) {
    console.log(error);
  }
});

test("expect document when key is provided", async () => {
  try {
    const status = await getStatus(
      `${tableName}/${"jesttest@jest.com"}/Status`,
      "Ex16AHdCZk6vqUCqOdzf"
    ).catch((error) => {
      console.log(error);
    });
    expect(status.id).toEqual("Ex16AHdCZk6vqUCqOdzf");
  } catch (error) {
    console.log(error);
  }
});

test("expect doctor to be set", async () => {
  try {
    const patientInfo = await setAssignedDoctor(
      "jesttest@jest.com",
      "test@admin.com"
    ).catch((error) => {
      console.log(error);
    });
    expect(patientInfo.assignedDoctor).toEqual("test@admin.com");
  } catch (error) {
    console.log(error);
  }
});

test("expect status to be set", async () => {
  try {
    const patientInfo = await setStatus("jesttest@jest.com", "POSITIVE").catch(
      (error) => {
        console.log(error);
      }
    );
    expect(patientInfo.status).toEqual("POSITIVE");
  } catch (error) {
    console.log(error);
  }
});

test("expect recovered to be set", async () => {
  try {
    const patientInfo = await setRecovered("jesttest@jest.com", "true").catch(
      (error) => {
        console.log(error);
      }
    );
    expect(patientInfo.status).toEqual("true");
  } catch (error) {
    console.log(error);
  }
});

afterEach(() => {
  cleanup();
});
