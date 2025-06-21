

const MainProducts2 = () =>{

     const { id } = useParams();
        const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
        // const product = products.find(i => i.id.toString() === id);
        useEffect(() => {
    fetch(`http://localhost:5000/Products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.log("error", err));
    }, [id]);

    return(
        <div className="py-2">
            <div className="mt-5">
                <div className="row">
                    {/* slider- products */}
                    <div className="col-12  col-lg-6 col-xl-6">
                        
                    </div>

                    {/* product description */}
                    <div className="col-12  col-lg-6 col-xl-6">
                        <div className="mt-4">
                            <div className="py-4">
                                {
                                    product ? (
                                        <>
                                        {/* your JSX here */}
                                        </>
                                    ) : (
                                        <p>loading</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainProducts2