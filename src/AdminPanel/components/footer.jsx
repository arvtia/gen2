const AdminFooter =()=> {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <small>&copy; {new Date().getFullYear()} Gen-Gy Admin Panel. All rights reserved.</small>
      </div>
    </footer>
  );
}

export default AdminFooter;