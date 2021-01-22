export default {
    name: 'change',
    config: {},
    install(Vue) {
        Vue.directive('change', {
            bind(el, binding, vnode, oldVnode) {
                function inputBind(input) { // 事件绑定,输入框去掉emoji表情
                    input.addEventListener("input", (e) => {
                        let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                        regStr.test(input.value) && (input.value = input.value.replace(regStr, "").trim())
                        if (!input.value.trim()) {
                            input[type] = ""
                        }
                    }, false)
                }
                // 如果指令绑定在input上就直接监听
                if (el.tagName.toLowerCase() === 'input') {
                    inputBind(el)
                } else {
                    //如果绑定在父元素上则要递归遍历所有的input并绑定事件
                    function findInput(dom) {
                        if (!dom || !dom.length) {
                            return
                        }
                        for (let i = 0; i < dom.length; i++) {
                            if (dom[i].tagName && (['input', 'textarea'].includes(dom[i].tagName.toLowerCase()))) {
                                inputBind(dom[i])
                                continue;
                            }
                            findInput(dom[i].childNodes)
                        }
                    }
                    findInput(el.childNodes)
                }
            }
        })
    }
}
