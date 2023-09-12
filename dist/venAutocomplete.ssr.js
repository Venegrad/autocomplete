'use strict';var vue=require('vue');var script = /*#__PURE__*/vue.defineComponent({
  name: 'autocomplete',
  emits: ['update:modelValue', 'inputEvent', 'changed', 'opened'],
  props: {
    disabledSymobols: {
      type: String,
      default: "£™¢∞§¶•ª•ªº"
    },
    min: {
      type: Number,
      min: 1
    },
    max: {
      type: Number,
      default: 200
    },
    dublicates: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: [String, Number]
    },
    list: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: [Array, String, Number],
      default: () => []
    }
  },
  watch: {
    modelValue(val) {
      this.innerValue = this.filterModel(val);
      this.$emit("changed", this.filterModel(val));
    },
    open() {
      this.highlight = 0;
      this.$emit('opened', this.open);
    },
    inputData() {
      this.highlight = 0;
      this.$emit("inputEvent", this.inputData);
    }
  },
  computed: {
    computedList() {
      let willList = this.list.filter(el => {
        return el && this.inputData && el.toLowerCase().includes(this.inputData.toLowerCase()) && !this.innerValue.find(vl => vl.toLowerCase() === el.toLowerCase());
      });
      return willList;
    }
  },
  mounted(el, binding) {
    this.filterModel(this.modelValue);
    this.$emit("update:modelValue", this.filterModel(this.modelValue));
    document.addEventListener("click", this.closeHandler);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeHandler);
  },
  data() {
    return {
      inputData: null,
      innerValue: this.filterModel(this.modelValue),
      open: false,
      highlight: 0
    };
  },
  directives: {
    outside: {
      mounted(el, binding) {
        const handler = e => {
          if (!el.contains(e.target) && el !== e.target) {
            binding.value(e);
          }
        };
        el.__ClickOutsideHandler__ = handler;
        document.addEventListener('click', handler);
      },
      beforeUnmount(el) {
        document.removeEventListener('click', el.__ClickOutsideHandler__);
      },
      getSSRProps(binding, vnode) {
        return {};
      }
    }
  },
  methods: {
    closeHandler($event) {
      // console.log($event.target.closest(this.$refs.hhhd))
    },
    closeList() {
      this.open = false;
    },
    scrolIntoList() {
      const ref = this.$refs.ohThisFuckingIndex;
      if (!ref || !ref.length) return;
      const element = ref[this.highlight];
      element.scrollIntoView({
        "block": "center"
      });
    },
    goBottom() {
      if (this.computedList.length > this.highlight + 1) this.highlight++;
      this.scrolIntoList();
    },
    goUp() {
      if (this.highlight !== 0) this.highlight--;
      this.scrolIntoList();
    },
    selectTag(item) {
      this.inputData = null;
      this.innerValue.push(item);
      this.open = false;
      this.$emit("update:modelValue", this.filterModel(this.innerValue));
      this.blurNeed();
    },
    uniqueArray(arr) {
      return arr.filter((value, index, self) => {
        const toLower = self.map(el => el.toLowerCase());
        return toLower.indexOf(value.toLowerCase()) === index;
      });
    },
    filterModel(items) {
      if (!this.disabledSymobols || !items || !items.length) return;
      let willArray = [];
      const tbt = items.map(vl => {
        let ks = vl;
        [...this.disabledSymobols].forEach(el => ks = ks.replaceAll(el, ""));
        return ks;
      });
      this.innerValue = tbt;
      willArray = tbt;
      if (!this.dublicates) willArray = this.uniqueArray(willArray);
      return willArray;
    },
    blurNeed() {
      this.$refs.venAutocomplete.focus();
      this.closeList();
    },
    removeLast() {
      if (this.inputData || !this.innerValue || !this.innerValue.length) return;
      this.modelValue.pop();
      this.innerValue.pop();
    },
    removeIndex(i) {
      const fst = this.modelValue.filter((el, ind) => ind !== i);
      this.$emit('update:modelValue', fst);
    },
    goEnter() {
      if (!this.open) {
        this.hendeHoh();
      } else {
        this.innerValue.push(this.computedList[this.highlight]);
        this.open = false;
        this.inputData = null;
        this.$emit("update:modelValue", this.filterModel(this.innerValue));
      }
    },
    hendeHoh() {
      let tw = [];
      if (this.disabledSymobols) tw = this.disabledSymobols;
      [...tw, ","].forEach(el => this.inputData = this.inputData.replaceAll(el, ""));
      if (!this.inputData || this.inputData.length < this.min || this.inputData.length > this.max) return;
      this.inputData = this.inputData.replaceAll(",", "");
      if (!this.modelValue) {
        this.$emit('update:modelValue', this.filterModel([this.inputData]));
      } else {
        const fst = [...this.modelValue, this.inputData];
        this.$emit('update:modelValue', this.filterModel(fst));
      }
      this.inputData = null;
    },
    goType(e) {
      // Search items
      this.open = this.computedList.length > 0;

      // Disable symbols
      if (this.disabledSymobols) [...this.disabledSymobols].forEach(el => this.inputData = this.inputData.replaceAll(el, ""));

      // Long live 'if', what do u do, haha
      if ((e.data === "," || this.inputData && this.inputData.includes(",")) && /[^,]/.test(this.inputData)) {
        this.hendeHoh();
      } else if (!/[^,]/.test(this.inputData)) {
        this.inputData = null;
      }
      if (!this.inputData || !this.inputData.length) this.open = false;
    }
  }
});const _withScopeId = n => (vue.pushScopeId("data-v-5470dba2"), n = n(), vue.popScopeId(), n);
const _hoisted_1 = ["onClick"];
const _hoisted_2 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/vue.createElementVNode("span", null, null, -1));
const _hoisted_3 = [_hoisted_2];
const _hoisted_4 = ["placeholder", "maxlength"];
const _hoisted_5 = {
  key: 0,
  class: "venAutocomplete__dropdown"
};
const _hoisted_6 = ["onMouseenter", "onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_outside = vue.resolveDirective("outside");
  return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(["venAutocomplete", {
      'venAutocomplete_active': _ctx.open
    }])
  }, [vue.createElementVNode("div", {
    class: "venAutocomplete__input",
    onClick: _cache[8] || (_cache[8] = function () {
      return _ctx.blurNeed && _ctx.blurNeed(...arguments);
    })
  }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.innerValue, (item, ind) => {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: "venAutocomplete__selected",
      key: 'vv' + ind
    }, [vue.createTextVNode(vue.toDisplayString(item) + " ", 1), vue.createElementVNode("div", {
      class: "venAutocomplete__close",
      onClick: $event => _ctx.removeIndex(ind)
    }, _hoisted_3, 8, _hoisted_1)]);
  }), 128)), vue.withDirectives(vue.createElementVNode("input", {
    ref: "venAutocomplete",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => _ctx.inputData = $event),
    autocomplete: "off",
    placeholder: _ctx.placeholder,
    type: "text",
    maxlength: _ctx.max,
    onInput: _cache[1] || (_cache[1] = function () {
      return _ctx.goType && _ctx.goType(...arguments);
    }),
    onKeydown: [_cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers(function () {
      return _ctx.goEnter && _ctx.goEnter(...arguments);
    }, ["prevent"]), ["enter"])), _cache[3] || (_cache[3] = vue.withKeys(vue.withModifiers(function () {
      return _ctx.goEnter && _ctx.goEnter(...arguments);
    }, ["prevent"]), ["tab"])), _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers(function () {
      return _ctx.goBottom && _ctx.goBottom(...arguments);
    }, ["prevent"]), ["down"])), _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers(function () {
      return _ctx.goUp && _ctx.goUp(...arguments);
    }, ["prevent"]), ["up"])), _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers(function () {
      return _ctx.closeList && _ctx.closeList(...arguments);
    }, ["prevent"]), ["esc"])), _cache[7] || (_cache[7] = vue.withKeys(function () {
      return _ctx.removeLast && _ctx.removeLast(...arguments);
    }, ["backspace"]))],
    class: "venAutocomplete__field"
  }, null, 40, _hoisted_4), [[vue.vModelText, _ctx.inputData]])]), _ctx.open ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.computedList, (item, ind) => {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["venAutocomplete__item", {
        'highlight': _ctx.highlight === ind
      }]),
      ref_for: true,
      ref: "ohThisFuckingIndex",
      onMouseenter: $event => _ctx.highlight = ind,
      key: 'gvs' + ind,
      onClick: $event => _ctx.selectTag(item)
    }, vue.toDisplayString(item), 43, _hoisted_6);
  }), 128))])) : vue.createCommentVNode("", true)], 2)), [[_directive_outside, _ctx.closeList]]);
}script.render = render;
script.__scopeId = "data-v-5470dba2";// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(() => {
  // Get component instance
  const installable = script;

  // Attach install function executed by Vue.use()
  installable.install = app => {
    app.component('venAutocomplete', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// iife/cjs usage extends esm default export - so import it all

// Attach named exports directly to component. IIFE/CJS will
// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)
Object.entries(namedExports).forEach(_ref => {
  let [exportName, exported] = _ref;
  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;