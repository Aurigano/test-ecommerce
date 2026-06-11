import{j as t}from"./jsx-runtime-Cr8k9s_V.js";import{H as s}from"./iframe-BI_-7ZT5.js";import{S as l}from"./storybook-shell-C0Cs_H82.js";import{C as o}from"./category-rail-C0gMVK4D.js";import"./preload-helper-PPVm8Dsz.js";import"./storefront-theme-DlliHzJ8.js";const y={title:"Storefront/Category Rail",component:o},e={render:()=>{const[r,a]=s.useState("All");return t.jsx(l,{className:"min-h-0",children:t.jsx(o,{categories:["All","Audio","Home","Electronics","Fashion","Beauty"],selectedCategory:r,onCategoryChange:a})})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    return <StorybookStorefrontShell className="min-h-0">
        <CategoryRail categories={['All', 'Audio', 'Home', 'Electronics', 'Fashion', 'Beauty']} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      </StorybookStorefrontShell>;
  }
}`,...e.parameters?.docs?.source}}};const S=["Default"];export{e as Default,S as __namedExportsOrder,y as default};
