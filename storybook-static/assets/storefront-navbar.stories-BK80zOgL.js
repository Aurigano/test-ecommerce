import{j as r}from"./jsx-runtime-Cr8k9s_V.js";import{H as h}from"./iframe-BI_-7ZT5.js";import{s as o}from"./storefront-theme-DlliHzJ8.js";import{S as c}from"./storybook-shell-C0Cs_H82.js";import{S as s}from"./storefront-navbar-BZ0wyGT5.js";import"./preload-helper-PPVm8Dsz.js";import"./badge-DQ5ziIsP.js";import"./index-BYWyDHmV.js";import"./utils-DclmTqRz.js";import"./select-C_Udd70t.js";import"./createLucideIcon-Uv7YMXkZ.js";const x={title:"Storefront/Navbar",component:s},e={render:()=>{const[t,m]=h.useState("classic"),a=Object.values(o),n=o[t];return r.jsx(c,{themeId:t,className:"min-h-0",children:r.jsx(s,{brandName:"Atlas Commerce",eyebrow:"Storefront shell",currentThemeLabel:n.label,showThemeSwitcher:!0,themeLabel:"Theme preset",themeId:t,themeOptions:a,onThemeChange:m})})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [themeId, setThemeId] = useState('classic');
    const themeOptions = Object.values(storefrontThemes);
    const currentTheme = storefrontThemes[themeId];
    return <StorybookStorefrontShell themeId={themeId} className="min-h-0">
        <StorefrontNavbar brandName="Atlas Commerce" eyebrow="Storefront shell" currentThemeLabel={currentTheme.label} showThemeSwitcher themeLabel="Theme preset" themeId={themeId} themeOptions={themeOptions} onThemeChange={setThemeId} />
      </StorybookStorefrontShell>;
  }
}`,...e.parameters?.docs?.source}}};const O=["Default"];export{e as Default,O as __namedExportsOrder,x as default};
