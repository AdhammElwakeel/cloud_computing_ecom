import { useEffect } from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/Categories/act/hooks";
import actGetCategories from "@/store/Categories/act/actGetCategories";
import Category from "@/components/Ecommerce/Category/Category";
import Loading from "@/components/feedback/Loading/Loading";
import { carouselItems, features } from "./constants";
import "./Home.css";

export default function Home() {
  const dispatch = useAppDispatch();
  const { record: categories, loading, error } = useAppSelector(
    (state) => state.Categories
  );

  useEffect(() => {
    dispatch(actGetCategories());
  }, [dispatch]);

  return (
    <div className="home-page">
      <section className="hero-section">
        <Carousel fade interval={5000} className="hero-carousel">
          {carouselItems.map((item) => (
            <Carousel.Item key={item.id}>
              <div
                className="carousel-slide"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="carousel-overlay"></div>
                <div className="carousel-content">
                  <span className="carousel-subtitle">{item.subtitle}</span>
                  <h1 className="carousel-title">{item.title}</h1>
                  <p className="carousel-description">{item.description}</p>
                  <Link to={item.buttonLink}>
                    <Button className="carousel-btn">{item.buttonText}</Button>
                  </Link>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      <section className="features-section">
        <Container>
          <Row>
            {features.map((feature, index) => (
              <Col key={index} xs={6} md={3}>
                <div className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="intro-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="intro-content">
                <span className="intro-badge">About Our Store</span>
                <h2 className="intro-title">
                  Your One-Stop Shop for Everything You Need
                </h2>
                <p className="intro-text">
                  We are passionate about bringing you the best products at
                  unbeatable prices. Our curated collection features top-quality
                  items from trusted brands, ensuring you always get the best
                  value for your money.
                </p>
                <p className="intro-text">
                  Whether you're looking for the latest trends or everyday
                  essentials, we've got you covered with our extensive range of
                  products and exceptional customer service.
                </p>
                <Link to="/about">
                  <Button className="intro-btn">Learn More About Us</Button>
                </Link>
              </div>
            </Col>
            <Col lg={6}>
              <div className="intro-image-wrapper">
                <div className="intro-image-card">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                    alt="Shopping Experience"
                    className="intro-image"
                  />
                </div>
                <div className="intro-stats">
                  <div className="stat-item">
                    <span className="stat-number">10K+</span>
                    <span className="stat-label">Happy Customers</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">500+</span>
                    <span className="stat-label">Products</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="categories-section">
        <Container>
          <div className="section-header">
            <span className="section-badge">Browse</span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Explore our wide range of categories and find exactly what you need
            </p>
          </div>
          <Loading status={loading} error={error}>
            <Row className="g-4">
              {categories.slice(0, 6).map((category) => (
                <Col key={category.id} xs={6} md={4} lg={4}>
                  <Category {...category} />
                </Col>
              ))}
            </Row>
          </Loading>
          <div className="section-footer">
            <Link to="/categories">
              <Button className="view-all-btn">View All Categories</Button>
            </Link>
          </div>
        </Container>
      </section>

      <section className="newsletter-section">
        <Container>
          <div className="newsletter-content">
            <h2 className="newsletter-title">Stay Updated</h2>
            <p className="newsletter-text">
              Subscribe to our newsletter and get exclusive offers, new arrivals,
              and insider-only discounts!
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <Button className="newsletter-btn">Subscribe</Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
