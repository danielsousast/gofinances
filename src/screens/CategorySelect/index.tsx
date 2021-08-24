import React from "react";
import Button from "../../components/Forms/Button";
import { categories } from "../../utils/categories";
import {
  CategoryList,
  Container,
  Header,
  Title,
  CategoryContainer,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";

export interface Category {
  key: string;
  name: string;
  icon: string;
}

interface ComponentProps {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

const CategorySelect: React.FC<ComponentProps> = ({
  category,
  setCategory,
  closeSelectCategory,
}) => {
  const handleCategoryPress = (item: Category) => {
    setCategory(item);
  };
  const renderCategoryItem = ({ item }: { item: Category }) => (
    <CategoryContainer
      onPress={() => handleCategoryPress(item)}
      isActive={category.key === item.key}
    >
      <Icon name={item.icon} />
      <Name>{item.name}</Name>
    </CategoryContainer>
  );

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <CategoryList
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={renderCategoryItem}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
};

export default CategorySelect;
