import{j as a}from"./jsx-runtime-Cr8k9s_V.js";import{H as r}from"./iframe-BI_-7ZT5.js";import{p as i}from"./products-Dzgr9FNA.js";import{S as B}from"./storybook-shell-C0Cs_H82.js";import{P as d}from"./product-listing-section-CPg-HshJ.js";import"./preload-helper-PPVm8Dsz.js";import"./storefront-theme-DlliHzJ8.js";import"./product-card-BLTaMFIr.js";import"./badge-DQ5ziIsP.js";import"./index-BYWyDHmV.js";import"./utils-DclmTqRz.js";import"./button-BPGZKaBS.js";import"./card-0OH4BKLt.js";import"./createLucideIcon-Uv7YMXkZ.js";import"./category-rail-C0gMVK4D.js";import"./product-toolbar-Cl7NsyPl.js";import"./input-DFGxfZZm.js";import"./select-C_Udd70t.js";const O={title:"Storefront/Product Listing Section",component:d,parameters:{layout:"fullscreen"}},s={render:()=>{const[n,u]=r.useState(""),[o,l]=r.useState("All"),[y,p]=r.useState("featured"),[g,m]=r.useState([]),[S,h]=r.useState({}),C=r.useMemo(()=>["All",...new Set(i.map(e=>e.category))],[]),f=r.useMemo(()=>{const e=n.trim().toLowerCase();return i.filter(t=>{const c=o==="All"||t.category===o,I=[t.title,t.category,t.description,t.seller,...t.tags].join(" ").toLowerCase();return c&&(e.length===0||I.includes(e))})},[n,o]);return a.jsx(B,{children:a.jsx(d,{products:f,query:n,onQueryChange:u,categories:C,selectedCategory:o,onCategoryChange:l,sortBy:y,onSortChange:p,wishlistIds:g,cartById:S,onToggleWishlist:e=>m(t=>t.includes(e)?t.filter(c=>c!==e):[...t,e]),onAddToCart:e=>h(t=>({...t,[e.id]:(t[e.id]??0)+1}))})})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('featured');
    const [wishlistIds, setWishlistIds] = useState([]);
    const [cartById, setCartById] = useState({});
    const categories = useMemo(() => ['All', ...new Set(products.map(product => product.category))], []);
    const filteredProducts = useMemo(() => {
      const normalizedQuery = query.trim().toLowerCase();
      return products.filter(product => {
        const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
        const searchText = [product.title, product.category, product.description, product.seller, ...product.tags].join(' ').toLowerCase();
        return categoryMatch && (normalizedQuery.length === 0 || searchText.includes(normalizedQuery));
      });
    }, [query, selectedCategory]);
    return <StorybookStorefrontShell>
        <ProductListingSection products={filteredProducts} query={query} onQueryChange={setQuery} categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} sortBy={sortBy} onSortChange={setSortBy} wishlistIds={wishlistIds} cartById={cartById} onToggleWishlist={productId => setWishlistIds(current => current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId])} onAddToCart={product => setCartById(current => ({
        ...current,
        [product.id]: (current[product.id] ?? 0) + 1
      }))} />
      </StorybookStorefrontShell>;
  }
}`,...s.parameters?.docs?.source}}};const R=["Default"];export{s as Default,R as __namedExportsOrder,O as default};
