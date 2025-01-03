import React from "react";

const CategorySelectList: React.FC<{
    categories: Category[], currentPage: number, currentNest?: number
}> = ({ categories, currentPage = 1, currentNest = 1 }) => {
    return (
        <>
            {
                categories.map((category, i) => {
                    return (
                        <React.Fragment key={category._id}>
                            {/* Main Category List */}
                            <option className={`text-lg`} value={category._id}>
                                {
                                    currentNest > 1 ? Array.from({ length: currentNest }).map((_, i) => {
                                        return <React.Fragment key={i}>&#160;</React.Fragment>
                                    }) : <></>
                                }
                                {category.name}
                            </option>
                            {/* Recursively Render List of Subcategories */}
                            {category.subcategories && <CategorySelectList currentNest={currentNest + 2} categories={category.subcategories} currentPage={currentPage} />}
                        </React.Fragment>
                    );
                })
            }
        </>
    )
};

export default CategorySelectList