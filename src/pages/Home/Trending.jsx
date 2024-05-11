import { useState, useContext, useEffect } from "react";
import AppContext from "../../AppContext.jsx";
import styled from "styled-components";
import ProductCard from "../../components/ProductCard";
import {
  sectionPadding,
  sectionTitle,
  cardsContainer,
} from "../../assets/styles/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


export default function Trending() {
  const { categories, allProducts } = useContext(AppContext);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  const trendingProducts = allProducts.filter((item) => item.trending === true);

  const [shownProducts, setShownProducts] = useState(trendingProducts);

  useEffect(() => {
    filterProducts();
  }, [allProducts, selectedCategory, currentIndex]); // добавлен currentIndex

  function filterProducts() {
    if (selectedCategory === "all") {
      setShownProducts(trendingProducts.slice(currentIndex, currentIndex + 5));
      return;
    } else {
      const categoryTrending = trendingProducts.filter(
          (item) => item.category === selectedCategory.title
      );
      setShownProducts(categoryTrending.slice(currentIndex, currentIndex + 5));
    }
  }

  function handleClick(category) {
    setSelectedCategory(category);
    setCurrentIndex(0); // сбросить currentIndex при изменении категории
  }

  function handlePrevClick() {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  }

  function handleNextClick() {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  return (
      <Container id="trending">
        <Header>
          <Title>Trending products</Title>

          <CategoriesList>
            <ListItem onClick={() => handleClick("all")}>All</ListItem>
            {categories.map((category) => (
                <ListItem
                    onClick={() => handleClick(category)}
                    key={category.title}
                >
                  {category.title}
                </ListItem>
            ))}
          </CategoriesList>
        </Header>
        <CardsContainer>
          {shownProducts.length > 0 ? (
              shownProducts.map((item) => (
                  <ProductCard key={item.id} item={item} />
              ))
          ) : (
              <MessageText>Products in this category are unavailable.</MessageText>
          )}
        </CardsContainer>
        <Controls>
          <ControlBtn onClick={handlePrevClick} ><LeftBtn/></ControlBtn>
          <ControlBtn onClick={handleNextClick} disabled={shownProducts.length <= 4 }> <RightBtn/></ControlBtn>
        </Controls>

      </Container>
  );
}

const Container = styled.section`
  ${sectionPadding}
`;

const CardsContainer = styled.div`
  ${cardsContainer}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid var(--secondary-color);
  margin-bottom: 60px;
`;

const Title = styled.h3`
  ${sectionTitle}
  {
    padding-bottom: 24px;
  }
`;

const CategoriesList = styled.ul`
  display: flex;
  gap: 32px;

  @media (max-width: 990px) {
    display: none;
  }
`;

const ListItem = styled.li`
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--text-color-secondary);
  padding-bottom: 24px;
  border-bottom: 2px solid var(--secondary-color);
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    color: var(--text-color-primary);
    border-bottom: 2px solid var(--primary-color);
  }
`;

const MessageText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: 250px;
`

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-top: 20px;
`;


const ControlBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-color: var(--secondary-color);
  color: var(--dark-gray);
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: var(--primary-color);
  }

  &:disabled {
    opacity: 10% ;
  }

  @media (max-width: 420px) {
    width: 28px;
    height: 28px;
    font-size: 16px;
    display: flex;
    flex-direction: row;
  }
`;


const LeftBtn = styled(ArrowBackIosIcon)`
  margin-left: 10px;
  @media (max-width: 420px) {
    transform: rotate(90deg);
    margin: 10px auto 0;
  }
`;

const RightBtn = styled(ArrowForwardIosIcon)`
  @media (max-width: 420px) {
    transform: rotate(90deg);
  }
`;

