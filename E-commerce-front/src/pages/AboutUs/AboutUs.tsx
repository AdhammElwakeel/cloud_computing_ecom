import { Container, Row, Col } from "react-bootstrap";
import { heroContent, storyContent, stats, values, teamMembers } from "./constants";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <Container>
          <div className="about-hero-content">
            <span className="about-badge">{heroContent.subtitle}</span>
            <h1 className="about-hero-title">{heroContent.title}</h1>
            <p className="about-hero-description">{heroContent.description}</p>
          </div>
        </Container>
      </section>

      <section className="about-stats">
        <Container>
          <Row>
            {stats.map((stat, index) => (
              <Col key={index} xs={6} md={3}>
                <div className="stat-card">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="about-story">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="story-content">
                <span className="section-badge">Who We Are</span>
                <h2 className="section-title">{storyContent.title}</h2>
                {storyContent.paragraphs.map((paragraph, index) => (
                  <p key={index} className="story-text">{paragraph}</p>
                ))}
              </div>
            </Col>
            <Col lg={6}>
              <div className="story-image-wrapper">
                <img
                  src={storyContent.image}
                  alt="Our Team"
                  className="story-image"
                />
                <div className="story-image-accent"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-values">
        <Container>
          <div className="section-header">
            <span className="section-badge">What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>
          <Row className="g-4">
            {values.map((value, index) => (
              <Col key={index} xs={12} sm={6} lg={3}>
                <div className="value-card">
                  <div className="value-icon">{value.icon}</div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

     
      <section className="about-team">
        <Container>
          <div className="section-header">
            <span className="section-badge">Meet The Team</span>
            <h2 className="section-title">The People Behind Our Success</h2>
            <p className="section-subtitle">
              Our talented team works tirelessly to bring you the best experience
            </p>
          </div>
          <Row className="g-4">
            {teamMembers.map((member, index) => (
              <Col key={index} xs={6} md={3}>
                <div className="team-card">
                  <div className="team-image-wrapper">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-image"
                    />
                  </div>
                  <div className="team-info">
                    <h4 className="team-name">{member.name}</h4>
                    <p className="team-role">{member.role}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="about-cta">
        <Container>
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Shopping?</h2>
            <p className="cta-text">
              Join thousands of happy customers and discover our amazing products today.
            </p>
            <a href="/categories" className="cta-button">
              Explore Products
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
