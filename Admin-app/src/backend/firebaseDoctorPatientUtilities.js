import { useFetchTimeStampData } from "./useFetchTimestampData";
import { getUpcomingQuery } from "./firebaseQueries";
import {
  getTableDocs,
  getTableData,
  getTableDataByQuery,
} from "./firebaseUtilities";

const tableName = "DoctorPatient";
const apptHistoryCollectionName = "AppointmentHistory";
const doctorPatientDelimiter = ";";

const getAppointmentsDoctorPatient = async () => {
  console.log("[getAppointmentsDoctorPatient]");
  let returnValue = [];

  // First get initial keys of DoctorPatient
  getDoctorPatients().then((doctorPatients) => {
    doctorPatients.forEach((doctorPatient) => {
      const doctorPatientKey = `${doctorPatient.doctor}${doctorPatientDelimiter}${doctorPatient.patient}`;
      getAppointmentHistory(doctorPatientKey).then((apptHistory) => {
        console.log(`apptHistory ${apptHistory}`);
        if (apptHistory && apptHistory.length > 0) {
          console.log(`startDate: ${apptHistory[0].startDate}`);
          returnValue[doctorPatientKey] = apptHistory[0];
        } else {
          return null;
        }
      });
    });
  });
};

const getDoctorPatients = async () => {
  return getTableData(tableName);
};

const getAllUpcomingAppointments = async () => {
  let returnValue = [];
  const doctorPatients = await getDoctorPatients();

  doctorPatients &&
    doctorPatients.forEach(async (doctorPatient) => {
      const patientKey = doctorPatient.patient;
      const doctorPatientKey = `${doctorPatient.doctor}${doctorPatientDelimiter}${doctorPatient.patient}`;
      const appointment = await getUpcomingAppointment(doctorPatientKey);
    });
};

const getAppointmentHistory = async (doctorPatientKey) => {
  console.log(`[getAppointmentHistory]: `);

  const dbString = `${tableName}/${doctorPatientKey}/${apptHistoryCollectionName}`;
  const dbQuery = await getUpcomingQuery(dbString, false);
  const returnValue = await getTableDataByQuery(dbQuery);

  return returnValue;
};

const getUpcomingAppointment = async (doctorPatientKey) => {
  console.log(`[getUpcomingAppointment]: `);

  const apptHistory = await getAppointmentHistory(doctorPatientKey);
  if (apptHistory && apptHistory.length > 0) {
    //    console.log(`startDate: ${apptHistory[0].startDate2}`);
    return apptHistory[0];
  } else {
    console.log(`getUpcomingAppointment: Returning null`);
    return null;
  }
};

/**
 * Obtain the tuples from the Status subcollection of a Client
 *
 * @param {*} patientKey
 * @returns Status tuples
 */
/* const getAppointmentsDoctorPatient = async (
  doctorKey,
  patientKey,
  isUpcomingOnly = false
) => {
  console.log("[getAppointmentsDoctorPatient]");
  const statusCollectionName = "AppointmentHistory";
  const doctorPatientKey = `${doctorKey}${doctorPatientDelimiter}${patientKey}`;
  const dbString = `${getTableName()}/${doctorPatientKey}/${statusCollectionName}`;
  //console.log("[dbString]: " + dbString);

  const queryToGet = await getUpcomingQuery(dbString, isUpcomingOnly);

  //  const returnValue = await getTableDataByQuery(queryToGet);
  const returnValue = await getTableData(dbString);

  if (returnValue) {
    console.log("[returnValue]: " + returnValue);
  }

  return returnValue;
};
 */
/* const getAllUpcomingAppointments = async () => {
  console.log("[getAllUpcomingAppointments]");

  let returnValue = [];

  getTableData(tableName).then((dataFromDoctorPatient) => {
    dataFromDoctorPatient &&
      dataFromDoctorPatient.foreach((data) => {
        const statusCollectionName = "AppointmentHistory";
        const doctorPatientKey = `${data.doctor}${doctorPatientDelimiter}${data.patient}`;
        const dbString = `${getTableName()}/${doctorPatientKey}/${statusCollectionName}`;
        console.log(dbString);
        getTableData(dbString).then(
          (dataFromAppointmentHistory) =>
            dataFromAppointmentHistory &&
            console.log(dataFromAppointmentHistory)
        );
      });
  });

  return returnValue;
};
 */

const useFetchAppointmentData = (doctorPatientKey, isTodayOnly = false) => {
  const dbPath = `${doctorPatientKey}/${apptHistoryCollectionName}`;

  return useFetchTimeStampData(tableName, isTodayOnly);
};

export {
  getAppointmentsDoctorPatient,
  getDoctorPatients,
  getUpcomingAppointment,
  getAppointmentHistory,
};
