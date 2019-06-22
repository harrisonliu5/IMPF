# DOM Differ

## 虚拟dom

集合了最小操作dom的过程。

他生成的dom要比自己写的dom的属性少。

``` javascript
    // 生成虚拟dom
    class Element{
        constructor(type,props,children){
            this.type=type;
            this.props = props;
            this.children = children;
        }
    }
    function createElement(type,props,children){
        return new Element(type,props,children);
    }
    createElement('ul',{'class':'item-list},[
        createElement('li',{'class':'item'},["1"]);
    ]);
```

## 通过对两个树的深度优先遍历并平级对比

``` javascript
    // dom diff
    //1.属性遍历{type:"ATTRS"}
    //2.文本变量
    //3.节点被删除
    //4.节点变化
    let globalIndex = 0;
    //补丁包
    let patchs={};
    function diff(oldTree,newTree){
        dfswalk(oldTree,newTree,globalIndexx);
        return patchs;
    }
    // 先序遍历
    function dfswalk(oldTree,newTree,index){
        let currentPatchs = [];
        if(!newTree){
            currentPatchs.push({
                type:"REMOVE",
                index
            });
        }else if(_.isString(oldTree)){
            if(_isString(newTree) && oldTree !== newTree  ){
                currentPatchs.push({
                    type:'TEXT',
                    text:newTree
                })
            }
        }else if(oldTree.type === newTress.type){
            //1.比属性
            //2.比节点
            diffChildren(oldTree.children,newTree.children);
        }
        if(currentPatchs.length>0){
            patchs[index] = currentPatchs
        }
    }

    function diffChildren(oldChildren,newChildren){
        oldChildren.forEach((child,idx)=>{
            dfswalk(child,newChildren[idx],++globalIndex);
        })
    }

    function util(){}
    util.isSting = (node) =>{
        return typeof node === 'string';
    }
```

