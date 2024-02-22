import { Link } from 'react-router-dom'

const Veterinarians = () => {
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Veterinarian List</h3>
      </div>
      <Link to="/dashboard/add-veterinarian" className="btn btn-success">
        Add Veterinarian
      </Link>
      <div className="mt-3"></div>
    </div>
  );
};

export default Veterinarians;
