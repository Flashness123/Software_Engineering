import {
  computed,
  createElementBlock,
  defineComponent,
  inject,
  normalizeStyle,
  onMounted,
  onUnmounted,
  openBlock,
  readonly,
  ref,
  unref,
  watch,
  watchEffect
} from "./chunk-OWZKEKZD.js";

// node_modules/vue3-google-signin/dist/index.es.js
var GoogleClientIdKey = Symbol();
var loaded = ref(false);
var isLoading = ref(false);
var error = ref(false);
var subscriberCount = ref(0);
var scriptTag = null;
var createScriptTag = () => {
  const scriptTag2 = document.createElement("script");
  scriptTag2.src = "https://accounts.google.com/gsi/client";
  scriptTag2.async = true;
  scriptTag2.defer = true;
  return scriptTag2;
};
var initialize = () => {
  isLoading.value = true;
  scriptTag = createScriptTag();
  document.head.appendChild(scriptTag);
  scriptTag.onload = () => {
    isLoading.value = false;
    loaded.value = true;
  };
  scriptTag.onerror = () => {
    isLoading.value = false;
    error.value = true;
  };
};
watch(
  () => subscriberCount.value,
  (newCount, _oldCount) => {
    if (newCount > 0 && !loaded.value && !isLoading.value) {
      initialize();
    }
  }
);
function useGsiScript() {
  onMounted(() => {
    subscriberCount.value++;
  });
  onUnmounted(() => {
    subscriberCount.value--;
  });
  return {
    scriptLoaded: readonly(loaded),
    scriptLoadError: readonly(error)
  };
}
var _sfc_main = defineComponent({
  __name: "GoogleSignInButton",
  props: {
    oneTap: { type: Boolean },
    autoSelect: { type: Boolean },
    loginUri: null,
    cancelOnTapOutside: { type: Boolean },
    promptParentId: null,
    nonce: null,
    context: null,
    stateCookieDomain: null,
    uxMode: null,
    allowedParentOrigin: null,
    itpSupport: { type: Boolean },
    type: null,
    theme: null,
    size: null,
    text: null,
    shape: null,
    logoAlignment: null,
    width: null,
    locale: null
  },
  emits: ["success", "error", "intermediateIframeCloseCallback", "nativeCallback", "promptMomentNotification"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const buttonContainerHeight = { large: 40, medium: 32, small: 20 };
    const clientId = inject(GoogleClientIdKey);
    const targetElement = ref(null);
    const { scriptLoaded } = useGsiScript();
    watchEffect(() => {
      var _a, _b, _c, _d;
      if (!scriptLoaded.value)
        return;
      (_a = window.google) == null ? void 0 : _a.accounts.id.initialize({
        client_id: clientId,
        callback: (credentialResponse) => {
          if (!credentialResponse.clientId || !credentialResponse.credential) {
            emits("error");
            return;
          }
          emits("success", credentialResponse);
        },
        allowed_parent_origin: props.allowedParentOrigin,
        auto_select: props.autoSelect,
        cancel_on_tap_outside: props.cancelOnTapOutside,
        context: props.context,
        intermediate_iframe_close_callback: () => {
          emits("intermediateIframeCloseCallback");
        },
        itp_support: props.itpSupport,
        login_uri: props.loginUri,
        native_callback: (resp) => {
          emits("nativeCallback", resp);
        },
        nonce: props.nonce,
        prompt_parent_id: props.promptParentId,
        state_cookie_domain: props.stateCookieDomain,
        ux_mode: props.uxMode
      });
      (_c = window.google) == null ? void 0 : _c.accounts.id.renderButton(targetElement.value, {
        type: props.type,
        theme: props.theme,
        size: props.size,
        text: props.text,
        shape: props.shape,
        logo_alignment: props.logoAlignment,
        width: (_b = props.width) == null ? void 0 : _b.toString(),
        locale: props.locale
      });
      if (props.oneTap)
        (_d = window.google) == null ? void 0 : _d.accounts.id.prompt((notification) => {
          emits("promptMomentNotification", notification);
        });
    });
    onUnmounted(() => {
      var _a;
      if (props.oneTap) {
        (_a = window.google) == null ? void 0 : _a.accounts.id.cancel();
      }
    });
    const height = computed(() => buttonContainerHeight[props.size || "large"]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "targetElement",
        ref: targetElement,
        style: normalizeStyle({ display: "inline-flex", height: unref(height) })
      }, null, 4);
    };
  }
});
function hasGrantedAllScopes(tokenResponse, firstScope, ...restScopes) {
  var _a;
  return ((_a = window.google) == null ? void 0 : _a.accounts.oauth2.hasGrantedAllScopes(
    tokenResponse,
    firstScope,
    ...restScopes
  )) || false;
}
function hasGrantedAnyScopes(tokenResponse, firstScope, ...restScopes) {
  var _a;
  return ((_a = window.google) == null ? void 0 : _a.accounts.oauth2.hasGrantedAnyScope(
    tokenResponse,
    firstScope,
    ...restScopes
  )) || false;
}
function revokeAccessToken(accessToken, done) {
  var _a;
  (_a = window.google) == null ? void 0 : _a.accounts.oauth2.revoke(accessToken, () => {
    done == null ? void 0 : done();
  });
}
function buildCodeRequestRedirectUrl(options) {
  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const queryParams = new URLSearchParams({
    gsiwebsdk: "3",
    client_id: options.client_id,
    scope: options.scope,
    include_granted_scopes: "true",
    access_type: "offline",
    response_type: "code",
    prompt: "consent"
  });
  if (options.hint)
    queryParams.append("hint", options.hint);
  if (options.hosted_domain)
    queryParams.append("hosted_domain", options.hosted_domain);
  if (options.redirect_uri === void 0) {
    queryParams.append("redirect_uri", window.origin);
  } else {
    queryParams.append("redirect_uri", options.redirect_uri);
  }
  if (options.select_account === void 0) {
    queryParams.append("select_account", "false");
  } else {
    queryParams.append("select_account", `${options.select_account}`);
  }
  if (options.enable_serial_consent === void 0) {
    queryParams.append("enable_serial_consent", "false");
  } else {
    queryParams.append(
      "enable_serial_consent",
      `${options.enable_serial_consent}`
    );
  }
  if (options.state)
    queryParams.append("state", options.state);
  return `${baseUrl}?${queryParams.toString()}`;
}
function useCodeClient(options = {}) {
  const { scope = "", onError, onSuccess, ...rest } = options;
  const { scriptLoaded } = useGsiScript();
  const clientId = inject(GoogleClientIdKey);
  const isReady = ref(false);
  const codeRequestRedirectUrl = ref(null);
  let client;
  watchEffect(() => {
    var _a;
    isReady.value = false;
    if (!scriptLoaded.value)
      return;
    const scopeValue = unref(scope);
    const scopes = Array.isArray(scopeValue) ? scopeValue.join(" ") : scopeValue;
    const computedScopes = `openid email profile ${scopes}`;
    codeRequestRedirectUrl.value = buildCodeRequestRedirectUrl({
      client_id: clientId,
      scope: computedScopes,
      ...rest
    });
    client = (_a = window.google) == null ? void 0 : _a.accounts.oauth2.initCodeClient({
      client_id: clientId,
      scope: computedScopes,
      callback: (response) => {
        if (response.error)
          return onError == null ? void 0 : onError(response);
        onSuccess == null ? void 0 : onSuccess(response);
      },
      ...rest
    });
    isReady.value = true;
  });
  return {
    isReady: readonly(isReady),
    login: () => client == null ? void 0 : client.requestCode(),
    codeRequestRedirectUrl: readonly(codeRequestRedirectUrl)
  };
}
function useOneTap(options) {
  const {
    disableAutomaticPrompt = false,
    onSuccess,
    onError,
    onPromptMomentNotification,
    onNativeCallback,
    onIntermediateIframeCloseCallback,
    autoSelect,
    loginUri,
    cancelOnTapOutside,
    promptParentId,
    nonce,
    context,
    stateCookieDomain,
    allowedParentOrigin,
    itpSupport
  } = options || {};
  const { scriptLoaded } = useGsiScript();
  const clientId = inject(GoogleClientIdKey);
  const isReady = ref(false);
  const login = () => {
    var _a;
    return isReady.value && ((_a = window.google) == null ? void 0 : _a.accounts.id.prompt(
      (notification) => onPromptMomentNotification == null ? void 0 : onPromptMomentNotification(notification)
    ));
  };
  watchEffect((onCleanup) => {
    var _a, _b;
    isReady.value = false;
    if (!scriptLoaded.value)
      return;
    const shouldAutoLogin = !unref(disableAutomaticPrompt);
    const auto_select = unref(autoSelect);
    const login_uri = unref(loginUri);
    const prompt_parent_id = unref(promptParentId);
    const nonceValue = unref(nonce);
    const contextValue = unref(context);
    const state_cookie_domain = unref(stateCookieDomain);
    const allowed_parent_origin = unref(allowedParentOrigin);
    const itp_support = unref(itpSupport);
    const cancel_on_tap_outside = unref(cancelOnTapOutside);
    (_a = window.google) == null ? void 0 : _a.accounts.id.initialize({
      client_id: clientId,
      callback: (credentialResponse) => {
        console.log("cb triggered");
        if (!credentialResponse.clientId || !credentialResponse.credential) {
          onError == null ? void 0 : onError();
          return;
        }
        onSuccess == null ? void 0 : onSuccess(credentialResponse);
      },
      native_callback: (response) => {
        onNativeCallback == null ? void 0 : onNativeCallback(response);
      },
      intermediate_iframe_close_callback: () => {
        onIntermediateIframeCloseCallback == null ? void 0 : onIntermediateIframeCloseCallback();
      },
      auto_select,
      allowed_parent_origin,
      context: contextValue,
      itp_support,
      login_uri,
      nonce: nonceValue,
      prompt_parent_id,
      state_cookie_domain,
      cancel_on_tap_outside
    });
    isReady.value = true;
    if (shouldAutoLogin) {
      (_b = window.google) == null ? void 0 : _b.accounts.id.prompt(
        (notification) => onPromptMomentNotification == null ? void 0 : onPromptMomentNotification(notification)
      );
    }
    onCleanup(() => {
      var _a2;
      (_a2 = window.google) == null ? void 0 : _a2.accounts.id.cancel();
    });
  });
  return { isReady: readonly(isReady), login };
}
function useTokenClient(options = {}) {
  const { scope = "", onError, onSuccess, ...rest } = options;
  const { scriptLoaded } = useGsiScript();
  const clientId = inject(GoogleClientIdKey);
  const isReady = ref(false);
  let client;
  watchEffect(() => {
    var _a;
    isReady.value = false;
    if (!scriptLoaded.value)
      return;
    const scopeValue = unref(scope);
    const scopes = Array.isArray(scopeValue) ? scopeValue.join(" ") : scopeValue;
    client = (_a = window.google) == null ? void 0 : _a.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: `openid email profile ${scopes}`,
      callback: (response) => {
        if (response.error)
          return onError == null ? void 0 : onError(response);
        onSuccess == null ? void 0 : onSuccess(response);
      },
      ...rest
    });
    isReady.value = true;
  });
  return {
    isReady: readonly(isReady),
    login: (overrideConfig) => client == null ? void 0 : client.requestAccessToken(overrideConfig)
  };
}
function idRevoke(hint, callback) {
  var _a;
  (_a = window.google) == null ? void 0 : _a.accounts.id.revoke(hint, (resp) => {
    callback == null ? void 0 : callback(resp);
  });
}
function decodeCredential(credential) {
  const base64Url = credential.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window.atob(base64).split("").map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`).join("")
  );
  const decodedToken = JSON.parse(jsonPayload);
  return {
    email: decodedToken.email,
    email_verified: decodedToken.email_verified,
    hd: decodedToken.hd,
    family_name: decodedToken.family_name,
    given_name: decodedToken.given_name,
    name: decodedToken.name,
    picture: decodedToken.picture,
    id: decodedToken.sub
  };
}
var PLUGIN_NAME = "GoogleSignInPlugin";
var toPluginError = (err) => `[${PLUGIN_NAME}]: ${err}`;
var plugin = {
  install(app, options) {
    if (!options) {
      throw new Error(
        toPluginError(`initialize plugin by passing an options object`)
      );
    }
    if (!options.clientId || options.clientId && options.clientId.trim().length === 0) {
      throw new Error(toPluginError("clientId is required to initialize"));
    }
    app.provide(GoogleClientIdKey, options.clientId);
    app.component("GoogleSignInButton", _sfc_main);
  }
};
export {
  _sfc_main as GoogleSignInButton,
  PLUGIN_NAME,
  buildCodeRequestRedirectUrl,
  decodeCredential,
  plugin as default,
  hasGrantedAllScopes,
  hasGrantedAnyScopes,
  idRevoke,
  revokeAccessToken,
  useCodeClient,
  useGsiScript,
  useOneTap,
  useTokenClient
};
//# sourceMappingURL=vue3-google-signin.js.map
