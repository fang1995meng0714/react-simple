import Component from "../react/component";
const ReactDOM = {
    render
};

function render(vnode, container) {
    return container.appendChild(_render(vnode))
}

function createComponent(comp, props) {
    let inst;
    if(comp.prototype && comp.prototype.render) {
         // 如果是类组件则创建实例
        inst = new comp(props);
    } else {
        // 如果是函数组件 将函数组件扩展为类组件 方便后面统一管理
        inst = new Component(props);
        inst.constructor = comp;
        inst.render = function() {
            return this.constructor(props);
        }
    }

    return inst;
}

function _render(vnode) {
    if(vnode === undefined || vnode === null || typeof vnode === "boolean" || vnode === "") return;

    // 如果是字符串
    if(typeof vnode === "string") {
        return document.createTextNode(vnode); 
    }

    // 如果tag是函数渲染组件
    
    if(typeof vnode.tag === "function") {
        // 创建组件
        const comp = createComponent(vnode.tag, vnode.attrs);
        console.log(comp)
        // 设置组件属性
        // setComponentProps(comp, vnode.attrs);
        
        // return comp.base;
    }

    if(typeof vnode === "object") {
        const { 
            tag,
            attrs
        } = vnode;
        const dom = document.createElement(tag);

        if(attrs) {
            Object.keys(attrs).forEach(key => {
                const value = attrs[key];
                setAttribute(dom, key, value);
            })
        }

        // 递归渲染子节点
        vnode.childrens.forEach(child => render(child, dom))

        return dom;
    }
}

function setAttribute(dom, key, value) {
    if(key === "className") {
        key = "class";
        dom[key] = value || "";
    }
    
    if(/on\w+/.test(key)) {
        key = key.toLowerCase();
        dom[key] = value || "";
    } else if(key === "style") {
        if(!value || typeof value === "string") {
            dom.style.cssText = value || "";
        } else if(value && typeof value === "object") {
            for(let k in value) {
                if(typeof value[k] === "number") {
                    dom.style[k] = value[k] + "px";
                } else {
                    dom.style[k] = value[k];
                }
            }
        }
    } else {
        if(key in dom) {
            dom[key] = value || "";
        }
        if(value) {
            dom.setAttribute(key, value);
        }else {
            dom.removeAttribute(key);
        }
    }

}

export default ReactDOM;