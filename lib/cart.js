export function addProduct (slug, quantity, price, name){
    const pickedProduct = {
        slug: slug,
        name: name,
        price: price,
        quantity: quantity
    }
    // update Local storage

    // Retrieve stored products from localStorage
    let storedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Check if the product already exists
    const existingProduct = storedProducts.find(product => product.slug === pickedProduct.slug);

    let updatedProducts;
    if (existingProduct) {
        // If the product exists, return a new array with an updated quantity (immutably)
        updatedProducts = storedProducts.map(product =>
            product.slug === pickedProduct.slug
                ? { ...product, quantity: pickedProduct.quantity }
                : product
        );
    } else {
        // If the product does not exist, create a new array with the new product
        updatedProducts = [...storedProducts, pickedProduct];
    }

    // Update localStorage with the new state
    localStorage.setItem('selectedProducts', JSON.stringify(updatedProducts));

    //Dispatch a custom event to notify UI updates (in logoNavCart.jsx)
    window.dispatchEvent(new Event("cartUpdated"));
}

export function removeAll(){
    localStorage.removeItem('selectedProducts');
    window.dispatchEvent(new Event("cartUpdated"));
}
