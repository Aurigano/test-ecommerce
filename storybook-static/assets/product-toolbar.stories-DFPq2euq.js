import{j as o}from"./jsx-runtime-Cr8k9s_V.js";import{H as t}from"./iframe-BI_-7ZT5.js";import{S as u}from"./storybook-shell-C0Cs_H82.js";import{P as e}from"./product-toolbar-Cl7NsyPl.js";import"./preload-helper-PPVm8Dsz.js";import"./storefront-theme-DlliHzJ8.js";import"./input-DFGxfZZm.js";import"./utils-DclmTqRz.js";import"./select-C_Udd70t.js";import"./createLucideIcon-Uv7YMXkZ.js";import"./button-BPGZKaBS.js";import"./index-BYWyDHmV.js";import"./badge-DQ5ziIsP.js";const Q={title:"Storefront/Product Toolbar",component:e},r={render:()=>{const[s,a]=t.useState(""),[n,m]=t.useState("featured");return o.jsx(u,{className:"min-h-0",children:o.jsx(e,{query:s,onQueryChange:a,sortBy:n,onSortChange:m})})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');
    return <StorybookStorefrontShell className="min-h-0">
        <ProductToolbar query={query} onQueryChange={setQuery} sortBy={sortBy} onSortChange={setSortBy} />
      </StorybookStorefrontShell>;
  }
}`,...r.parameters?.docs?.source}}};const j=["Default"];export{r as Default,j as __namedExportsOrder,Q as default};
