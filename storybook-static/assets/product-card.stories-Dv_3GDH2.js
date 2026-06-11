import{j as e}from"./jsx-runtime-Cr8k9s_V.js";import{H as s}from"./iframe-BI_-7ZT5.js";import{P as o}from"./product-card-BLTaMFIr.js";import{g as p,s as u}from"./storefront-theme-DlliHzJ8.js";import{p as m}from"./products-Dzgr9FNA.js";import"./preload-helper-PPVm8Dsz.js";import"./badge-DQ5ziIsP.js";import"./index-BYWyDHmV.js";import"./utils-DclmTqRz.js";import"./button-BPGZKaBS.js";import"./card-0OH4BKLt.js";import"./createLucideIcon-Uv7YMXkZ.js";const j={title:"Storefront/Product Card",component:o,parameters:{layout:"centered"},args:{product:m[0]}},t={render:a=>{const[n,i]=s.useState(!1),[c,d]=s.useState(0);return e.jsx("div",{style:p(u.classic),className:"w-[320px] bg-[var(--storefront-backdrop)] p-4",children:e.jsx(o,{...a,inWishlist:n,cartQuantity:c,onToggleWishlist:()=>i(r=>!r),onAddToCart:()=>d(r=>r+1)})})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [saved, setSaved] = useState(false);
    const [quantity, setQuantity] = useState(0);
    return <div style={getStorefrontThemeVars(storefrontThemes.classic)} className="w-[320px] bg-[var(--storefront-backdrop)] p-4">
        <ProductCard {...args} inWishlist={saved} cartQuantity={quantity} onToggleWishlist={() => setSaved(current => !current)} onAddToCart={() => setQuantity(current => current + 1)} />
      </div>;
  }
}`,...t.parameters?.docs?.source}}};const P=["Default"];export{t as Default,P as __namedExportsOrder,j as default};
