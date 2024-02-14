import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [classes,setClasses] = useState([]);
    const [schoolId,setSchoolId]=useState('');
    const [studentId, setStudentId]= useState('');
    const [status, setStatus]= useState('active');
    const[editingClass, setEditingClass]= useState(null);

    useEffect(()=>{

        setClasses([
            {
                "id": "1",
                "school-id": "1",
                "students": [
                  {
                    "student-id": "B102",
                    "assignment": ""
                  }
                ],
                "status": "active"
              }
        ]);
    } ,[]);

const handleCreateOrUpdateClass = (e)=>{
    e.preventDefault();
    const newClass={
          id:editingClass ? editingClass.id:Math.random().toString(36).substr(2,9),
          schoolId,
          students:[{
            studentId,
            assignment:"New Assignment",
        }],
        status
    }

    if(editingClass){
        setClasses(classes.map(cls=>cls.id===editingClass.id ? newClass:cls))
    }else{
        setClasses([...classes,newClass])
    }
    
    setSchoolId("")
    setStudentId("")
    setStatus("")
    setEditingClass(null);
}



const handleEdit=(cls)=>{
    setSchoolId(cls.schoolId)
    setStudentId(cls.students[0].studentId)
    setStatus(cls.status)
    setEditingClass(cls);
}


const handleDelete=(id)=>{
    setClasses(classes.filter(cls=>cls.id!==id))
}
  return (
    <>
      <form onsubmit={handleCreateOrUpdateClass}>
        <input
        type="text"
        placeholder="school Id"
        value={schoolId}
        onChange={(e)=> setSchoolId(e.target.value)} 
        />

<input
        type="text"
        placeholder="student Id"
        value={studentId}
        onChange={(e)=> setStudentId(e.target.value)} 
        />
<select value={status} onChange={(e)=>setStatus(e.target.value)}>
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
</select>
<button type="submit">
    {editingClass?"Update":"Class"}
</button>
{editingClass && <button onClick={()=>setEditingClass(null)}>Cancel Edit</button>}

      </form>







      <h2>Class List</h2>
      <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>School Id</th>
                <th>Students</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            {classes.map((cls)=>{
                <tr key={cls.id}>
                    <td>{cls.id}</td>
                    <td>{cls.schoolId}</td>
                    <td>{cls.students.map(students=>students.studentId).join(', ')}</td>
                    <td>{cls.status}</td>
                    <td>
                        <button onClick={()=>handleEdit(cls)}>Edit</button>
                        <button onClick={()=>handleDelete(cls)}>Delete</button>

                    </td>
                </tr>
            })}
        </tbody>
      </table>
    </>
  )
}

export default Dashboard