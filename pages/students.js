import React, { useState, useEffect } from 'react';
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import axios from 'axios';

const StudentList = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: { name: '' },
  };

  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [isUpdatingStudent, setIsUpdatingStudent] = useState(false);
  const [updatingStudentId, setUpdatingStudentId] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(5);
  const [totalStudents, setTotalStudents] = useState(0);

  const calculateTotalStudents = () => {
    setTotalStudents(students.length);
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      console.log(response.data.users);
      setStudents(response.data.users || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [studentsPerPage]);

  useEffect(() => {
    calculateTotalStudents();
  }, [students]);

  useEffect(() => {
    const delay = setTimeout(() => {
      searchStudents();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchText]);

  const searchStudents = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/users/search?q=${searchText}`);
      console.log(response.data.users);
      setStudents(response.data.users || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleFormChange = (e) => {
    if (e.target.name === 'company.name') {
      setFormData({
        ...formData,
        company: {
          ...formData.company,
          name: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleAddStudent = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/users/add', formData);
      console.log(response.data);
      setStudents([...students, response.data]);
      setFormData(initialFormData);
      setIsAddingStudent(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      const response = await axios.put(`https://dummyjson.com/users/${updatingStudentId}`, formData);
      console.log(response.data);
      setStudents(students.map((student) => {
        if (student.id === updatingStudentId) {
          return response.data;
        }
        return student;
      }));
      setFormData(initialFormData);
      setIsUpdatingStudent(false);
      setUpdatingStudentId('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`https://dummyjson.com/users/${studentId}`);
      setStudents(students.filter((student) => student.id !== studentId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditStudent = (student) => {
    setIsUpdatingStudent(true);
    setUpdatingStudentId(student.id);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      company: {
        name: student.company.name,
      },
    });
  };

  const handleStudentsPerPageChange = (e) => {
    setStudentsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
    calculateTotalStudents();
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(students.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='homeContainer'>
      <div className='sideBarContainer'>
        <Sidebar />
      </div>
      <div className='mainContainer'>
        <Header />
        <div className='studentContainer'>
          <div className='studentHeader'>
            <h1>Student List</h1>
            <div className='searchAndAdd'>
              <div>
                <input className='searchBar' type="text" placeholder="Search by name" onChange={handleSearch} />
              </div>
              <button className='newStdBtn' onClick={() => setIsAddingStudent(true)}>Add New Student</button>
              {isAddingStudent && (
                <div>
                  <div className="popupBackground"></div>
                  <div className="popup">
                  <div className="popup-inner">
                    <h2>Add New Student</h2>
                    <div>
                      <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleFormChange} />
                    </div>
                    <div>
                      <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleFormChange} />
                    </div>
                    <div>
                      <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleFormChange} />
                    </div>
                    <div>
                      <input type="text" placeholder="Phone" name="phone" value={formData.phone} onChange={handleFormChange} />
                    </div>
                    <div>
                      <input type="text" placeholder="Company Name" name="company.name" value={formData.company.name} onChange={handleFormChange} />
                    </div>
                    {/* Diğer öğrenci bilgileri için giriş alanlarını buraya ekleyebilirsiniz */}
                    <button onClick={handleAddStudent}>Add</button>
                    <button onClick={() => setIsAddingStudent(false)}>Cancel</button>
                  </div>
                </div>
                </div>
                
              )}
              {isUpdatingStudent && (
                <div>
                  <div className="popupBackground"></div>
                  <div className="popup">
                    <div className="popup-inner">
                      <h2>Edit Student</h2>
                      <div>
                        <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleFormChange} />
                      </div>
                      <div>
                        <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleFormChange} />
                      </div>
                      <div>
                        <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleFormChange} />
                      </div>
                      <div>
                        <input type="text" placeholder="Phone" name="phone" value={formData.phone} onChange={handleFormChange} />
                      </div>
                      <div>
                        <input type="text" placeholder="Company Name" name="company.name" value={formData.company.name} onChange={handleFormChange} />
                      </div>
                      {/* Diğer öğrenci bilgileri için giriş alanlarını buraya ekleyebilirsiniz */}
                      <button onClick={handleUpdateStudent}>Update</button>
                      <button onClick={() => setIsUpdatingStudent(false)}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}


            </div>
          </div>
          {students.length === 0 ? (
            <div>Loading...</div>
          ) : (
            <div className="student-list">
              <div className="studentList-header">
                <div>Profile Photo</div>
                <div>First Name</div>
                <div>Email</div>
                <div>Phone</div>
                <div>Company</div>
                <div>Actions</div>
              </div>
              {currentStudents.map((student) => (
                <div key={student.id} className="student">
                  <div><img src={student.image} alt="Student" className="student-image" /></div>
                  <div>{student.firstName} {student.lastName} </div>
                  <div>{student.email}</div>
                  <div>{student.phone}</div>
                  <div>{student.company.name}</div>
                  <div className="student-actions">
                    <button onClick={() => handleEditStudent(student)}>
                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.3033 2.08777L16.9113 0.695801C16.4478 0.231934 15.8399 0 15.2321 0C14.6242 0 14.0164 0.231934 13.5525 0.69543L0.475916 13.772L0.00462689 18.0107C-0.0547481 18.5443 0.365701 19 0.88783 19C0.920858 19 0.953885 18.9981 0.987654 18.9944L5.22332 18.5265L18.3036 5.44617C19.231 4.51881 19.231 3.01514 18.3033 2.08777ZM4.67818 17.3924L1.2259 17.775L1.61035 14.3175L11.4031 4.52475L14.4747 7.59629L4.67818 17.3924ZM17.4639 4.60676L15.3141 6.7565L12.2426 3.68496L14.3923 1.53521C14.6164 1.31107 14.9148 1.1875 15.2321 1.1875C15.5494 1.1875 15.8474 1.31107 16.0719 1.53521L17.4639 2.92719C17.9266 3.39031 17.9266 4.14363 17.4639 4.60676Z" fill="#FEAF00" />
                      </svg>

                    </button>
                    <button onClick={() => handleDeleteStudent(student.id)}>
                      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.285713 2.25H4L5.2 0.675C5.35968 0.465419 5.56674 0.295313 5.80478 0.178154C6.04281 0.0609948 6.30529 0 6.57143 0L9.42857 0C9.69471 0 9.95718 0.0609948 10.1952 0.178154C10.4333 0.295313 10.6403 0.465419 10.8 0.675L12 2.25H15.7143C15.7901 2.25 15.8627 2.27963 15.9163 2.33238C15.9699 2.38512 16 2.45666 16 2.53125V3.09375C16 3.16834 15.9699 3.23988 15.9163 3.29262C15.8627 3.34537 15.7901 3.375 15.7143 3.375H15.0393L13.8536 16.4637C13.8152 16.8833 13.6188 17.2737 13.3029 17.558C12.987 17.8423 12.5745 17.9999 12.1464 18H3.85357C3.42554 17.9999 3.01302 17.8423 2.69711 17.558C2.38121 17.2737 2.18477 16.8833 2.14643 16.4637L0.960713 3.375H0.285713C0.209937 3.375 0.137264 3.34537 0.083683 3.29262C0.0301008 3.23988 0 3.16834 0 3.09375V2.53125C0 2.45666 0.0301008 2.38512 0.083683 2.33238C0.137264 2.27963 0.209937 2.25 0.285713 2.25ZM9.88571 1.35C9.8323 1.28034 9.76324 1.22379 9.68393 1.18475C9.60463 1.14572 9.51723 1.12527 9.42857 1.125H6.57143C6.48277 1.12527 6.39537 1.14572 6.31606 1.18475C6.23676 1.22379 6.1677 1.28034 6.11429 1.35L5.42857 2.25H10.5714L9.88571 1.35ZM3.28571 16.3617C3.29748 16.5019 3.36245 16.6325 3.46768 16.7277C3.57292 16.8228 3.7107 16.8754 3.85357 16.875H12.1464C12.2893 16.8754 12.4271 16.8228 12.5323 16.7277C12.6376 16.6325 12.7025 16.5019 12.7143 16.3617L13.8929 3.375H2.10714L3.28571 16.3617Z" fill="#FEAF00" />
                      </svg>

                    </button>
                  </div>
                </div>
              ))}
            </div>

          )}
          <div className="pagination">
            <div className='rowsPerPage'>
              Rows per page:
              <select value={studentsPerPage} onChange={handleStudentsPerPageChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
              </select>
            </div>
            <div>
              {`${indexOfFirstStudent + 1}-${indexOfLastStudent > students.length ? students.length : indexOfLastStudent} of ${students.length}`}
            </div>
            <div className='previousNext'>
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 13L1.07071 7.07071C1.03166 7.03166 1.03166 6.96834 1.07071 6.92929L7 1" stroke="#9FA2B4" stroke-width="2" stroke-linecap="round" />
                </svg>
              </button>
              <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 13L6.92929 7.07071C6.96834 7.03166 6.96834 6.96834 6.92929 6.92929L1 1" stroke="#9FA2B4" stroke-width="2" stroke-linecap="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className='footer'></div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
