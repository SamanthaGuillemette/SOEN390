import { Link } from 'react-router-dom';

const Patients = () => {
  return (
    <div>
      <h1>Patients screen</h1>
      <br></br>
      <Link to='/PatientProfile'> 1. John Doe </Link>
    </div>
  );
};

export default Patients;
