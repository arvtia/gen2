
import { useDispatch } from 'react-redux';
import { deleteNavlinks } from '../../ReduxAdmin/navSlice';



function NavLinksTableRows({ navLinks }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteNavlinks(id));
  };

  return (
        <>
            {navLinks.map((item, index) => (
                <tr key={index}>
                    <td className="bg-secondary text-white">{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.path}</td>
                    <td>
                        <div className="d-flex justify-content-between">
                        <p>{item.icon}</p>
                        <span><i className={item.icon}></i></span>
                        </div>
                    </td>
                    <td className="bg-light align-items-center">
                        <div className="d-flex justify-content-evenly">
                        <div className="btn btn-sm btn-outline-dark me-2">Edit</div>
                        <div 
                            className="btn btn-sm btn-outline-dark"
                            onClick={() => handleDelete(item.id)}
                        >
                            Delete
                        </div>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
}

export default NavLinksTableRows;
