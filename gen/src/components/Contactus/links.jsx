import { useEffect, useState } from "react";


const LinksSocialMedia = () => {
    const [socialLinks, setSocialLinks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/SocialLinks")
            .then((res) => res.json()) 
            .then((data) => setSocialLinks(data))
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, []);

    return (
        <div className="py-4 my-4">
            <div className="row">
                <div className="col-11 col-md-10 col-lg-10 col-xl-10">
                    <div className="row gy-2 py-3 justify-content-evenly">
                        {socialLinks.map((item, index) => (
                            <a key={index} href={item.link} className="btn">
                                <span>
                                    <i className={item.icon}></i>
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinksSocialMedia;