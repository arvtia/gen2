import { useEffect, useState } from "react";


const LinksSocialMedia = () => {
    const [socialLinks, setSocialLinks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3002/SocialLinks")
            .then((res) => res.json()) 
            .then((data) => setSocialLinks(data))
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, []);

    return (
        <div className="py-4 my-4">
            <div className="row justify-content-center">
                <p className="text-center">we are also on the following</p>
                <div className="col-11 col-md-10 col-lg-10 col-xl-10">
                    <div className="row gy-2 py-3 justify-content-evenly ">
                        {socialLinks.map((item, index) => (
                            <div className="col-auto" key={index}>
                                <a key={index} href={item.link} className="btn">
                                    <span>
                                        <i className={item.icon}></i>
                                    </span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinksSocialMedia;