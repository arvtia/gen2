import { useState, useEffect } from "react";
// import './style.css';

const TeamsCarousel = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [visibleCards, setVisibleCards] = useState([0, 1, 2]);
  const [cardsToShow, setCardsToShow] = useState(3);

  // Fetch team data
  useEffect(() => {
    fetch("http://localhost:5000/AboutUsPage")
      .then((res) => res.json())
      .then((data) => {
        const teamData = data[0]?.ourTeams || []; // Adjusting API structure
        setTeamMembers(teamData);
      })
      .catch((err) => console.error("Failed to fetch team members:", err));
  }, []);

  // Handle responsiveness
  useEffect(() => {
    const updateVisibleCards = () => {
      const newCardsToShow = window.innerWidth <= 768 ? 1 : 3;
      setCardsToShow(newCardsToShow);

      const newVisible = Array.from({ length: newCardsToShow }, (_, i) => i);
      setVisibleCards(newVisible);
    };

    window.addEventListener("resize", updateVisibleCards);
    updateVisibleCards();

    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const handleNext = () => {
    const lastIndex = visibleCards[visibleCards.length - 1];
    if (lastIndex < teamMembers.length - 1) {
      setVisibleCards(visibleCards.map((i) => i + 1));
    }
  };

  const handlePrev = () => {
    if (visibleCards[0] > 0) {
      setVisibleCards(visibleCards.map((i) => i - 1));
    }
  };

  return (
    <div className="carousel-wrapper mt-3 py-5 soft-vilot">
        <p className="display-3 text-center text-dark fw-bold py-3">The whole crew</p>
        <div className="navigation-buttons justify-content-center d-flex">
            <button className="nav-btn btn border-0" onClick={handlePrev} disabled={visibleCards[0] === 0}>
                <i className="bi bi-arrow-left"></i>
            </button>
            <button className="nav-btn btn border-0" onClick={handleNext} disabled={visibleCards[visibleCards.length - 1] >= teamMembers.length - 1}>
                <i className="bi bi-arrow-right"></i>
            </button>
        </div>

        <div className="card-container container-fluid px-3 py-3 lookwhat">
            {visibleCards.slice(0, cardsToShow).map((index) => {
            const member = teamMembers[index];
            if (!member) return null;

            return (
                <div className="p-2 soft-blur">
                    <div key={member.id || index} className="team-card card text-center img-hover-black">
                        <div className="card-body">
                            <img src={member.img} alt="img-of-team-member" className="img-fluid rounded-2 img-bwht" style={{minWidth:"300px", height:"390px", objectFit:"cover"}} />
                            <h5 className="team-name fw-bold pt-2">{member.name}</h5>
                            <p className="team-position text-muted">{member.position}</p>
                            <div className="social-links justify-content-evenly d-flex">
                                <a href={member.links[0]?.facebook} target="_blank" rel="noopener noreferrer">
                                    <span>
                                            <i className="bi bi-facebook text-dark"></i>
                                    </span>
                                </a> |
                                <a href={member.links[0]?.insta} target="_blank" rel="noopener noreferrer">
                                        <span>
                                            <i className="bi bi-instagram text-dark"></i>
                                        </span>
                                    </a> |
                                <a href={member.links[0]?.linkdin} target="_blank" rel="noopener noreferrer">
                                    <span>
                                            <i className="bi bi-linkedin text-dark"></i>
                                        </span>
                                </a>
                                <a href={member.links[0]?.email} target="_blank" rel="noopener noreferrer">
                                        <span>
                                            <i className="bi bi-envelope text-dark"></i>
                                        </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                );
            })}
        </div>
    </div>
  );
};

export default TeamsCarousel;