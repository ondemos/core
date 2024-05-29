'use strict'
var libdemos = (() => {
  var _scriptName = typeof document != 'undefined' ? document.currentScript?.src : undefined;
  if (typeof __filename != 'undefined') _scriptName ||= __filename;
  return (
function(moduleArg = {}) {
  var moduleRtn;

var Module=Object.assign({},moduleArg);var readyPromiseResolve,readyPromiseReject;var readyPromise=new Promise((resolve,reject)=>{readyPromiseResolve=resolve;readyPromiseReject=reject});var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=true;if(ENVIRONMENT_IS_NODE){}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";function locateFile(path){return scriptDirectory+path}var read_,readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else{}var out=console.log.bind(console);var err=console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;var dynamicLibraries=[];var wasmBinary;var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;HEAP8=new Int8Array(b);HEAP16=new Int16Array(b);HEAPU8=new Uint8Array(b);HEAPU16=new Uint16Array(b);HEAP32=new Int32Array(b);HEAPU32=new Uint32Array(b);HEAPF32=new Float32Array(b);HEAPF64=new Float64Array(b)}if(Module["wasmMemory"]){wasmMemory=Module["wasmMemory"]}else{var INITIAL_MEMORY=524288;wasmMemory=new WebAssembly.Memory({initial:INITIAL_MEMORY/65536,maximum:2147483648/65536})}updateMemoryViews();var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var __RELOC_FUNCS__=[];var runtimeInitialized=false;function preRun(){callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__RELOC_FUNCS__);callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){callRuntimeCallbacks(__ATPOSTRUN__)}function addOnInit(cb){__ATINIT__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function getUniqueRunDependency(id){return id}function addRunDependency(id){runDependencies++}function removeRunDependency(id){runDependencies--;if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="libdemos.wasm";if(!isDataURI(f)){return locateFile(f)}return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{if(!response["ok"]){throw`failed to load wasm binary file at '${binaryFile}'`}return response["arrayBuffer"]()}).catch(()=>getBinarySync(binaryFile))}}return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){if(!binary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(binaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{var result=WebAssembly.instantiateStreaming(response,imports);return result.then(callback,function(reason){err(`wasm streaming compile failed: ${reason}`);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(binaryFile,imports,callback)})})}return instantiateArrayBuffer(binaryFile,imports,callback)}function getWasmImports(){return{env:wasmImports,wasi_snapshot_preview1:wasmImports,"GOT.mem":new Proxy(wasmImports,GOTHandler),"GOT.func":new Proxy(wasmImports,GOTHandler)}}function createWasm(){var info=getWasmImports();function receiveInstance(instance,module){wasmExports=instance.exports;wasmExports=relocateExports(wasmExports,4096);var metadata=getDylinkMetadata(module);if(metadata.neededDynlibs){dynamicLibraries=metadata.neededDynlibs.concat(dynamicLibraries)}mergeLibSymbols(wasmExports,"main");LDSO.init();loadDylibs();addOnInit(wasmExports["__wasm_call_ctors"]);__RELOC_FUNCS__.push(wasmExports["__wasm_apply_data_relocs"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"],result["module"])}if(!wasmBinaryFile)wasmBinaryFile=findWasmBinary();instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult).catch(readyPromiseReject);return{}}var ASM_CONSTS={43844:()=>{out("All memory regions:")},43871:($0,$1,$2)=>{out("Region block "+ptrToString($0)+" - "+ptrToString($1)+" ("+toString(Number($2))+" bytes):")},43968:($0,$1,$2)=>{out("Region "+ptrToString($0)+", size: "+toString(Number($1))+" ("+($2?"used":"--FREE--")+")")},44063:()=>{out("")},44071:()=>{out("Free regions:")},44092:($0,$1,$2,$3,$4,$5)=>{out("In bucket "+$0+", free region "+ptrToString($1)+", size: "+toString(Number($2))+" (size at ceiling: "+toString(Number($3))+"), prev: "+ptrToString($4)+", next: "+ptrToString($5))},44286:($0,$1)=>{out("Free bucket index map: "+toString(Number($0)).toString(2)+" "+toString(Number($1)).toString(2))},44393:()=>{out("")},44401:($0,$1,$2)=>{err("Used region "+ptrToString($0)+", size: "+toString(Number($1))+" ("+($2?"used":"--FREE--")+") is corrupt (size markers in the beginning and at the end of the region do not match!)")},44587:($0,$1,$2)=>{err("Used region "+ptrToString($0)+", size: "+toString(Number($1))+" ("+($2?"used":"--FREE--")+") is corrupt (size markers in the beginning and at the end of the region do not match!)")},44773:($0,$1,$2,$3,$4,$5)=>{out("In bucket "+$0+", free region "+ptrToString($1)+", size: "+toString(Number($2))+" (size at ceiling: "+toString(Number($3))+"), prev: "+ptrToString($4)+", next: 0x"+ptrToString($5)+" is corrupt!")},44986:()=>{try{const window_="object"===typeof window?window:self;const crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;const buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0}catch(e){try{const crypto=require("crypto");const buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0}catch(e){throw"No secure random number generator found"}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var GOT={};var currentModuleWeakSymbols=new Set([]);var GOTHandler={get(obj,symName){var rtn=GOT[symName];if(!rtn){rtn=GOT[symName]=new WebAssembly.Global({value:"i32",mutable:true})}if(!currentModuleWeakSymbols.has(symName)){rtn.required=true}return rtn}};var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var getDylinkMetadata=binary=>{var offset=0;var end=0;function getU8(){return binary[offset++]}function getLEB(){var ret=0;var mul=1;while(1){var byte=binary[offset++];ret+=(byte&127)*mul;mul*=128;if(!(byte&128))break}return ret}function getString(){var len=getLEB();offset+=len;return UTF8ArrayToString(binary,offset-len,len)}function failIf(condition,message){if(condition)throw new Error(message)}var name="dylink.0";if(binary instanceof WebAssembly.Module){var dylinkSection=WebAssembly.Module.customSections(binary,name);if(dylinkSection.length===0){name="dylink";dylinkSection=WebAssembly.Module.customSections(binary,name)}failIf(dylinkSection.length===0,"need dylink section");binary=new Uint8Array(dylinkSection[0]);end=binary.length}else{var int32View=new Uint32Array(new Uint8Array(binary.subarray(0,24)).buffer);var magicNumberFound=int32View[0]==1836278016;failIf(!magicNumberFound,"need to see wasm magic number");failIf(binary[8]!==0,"need the dylink section to be first");offset=9;var section_size=getLEB();end=offset+section_size;name=getString()}var customSection={neededDynlibs:[],tlsExports:new Set,weakImports:new Set};if(name=="dylink"){customSection.memorySize=getLEB();customSection.memoryAlign=getLEB();customSection.tableSize=getLEB();customSection.tableAlign=getLEB();var neededDynlibsCount=getLEB();for(var i=0;i<neededDynlibsCount;++i){var libname=getString();customSection.neededDynlibs.push(libname)}}else{failIf(name!=="dylink.0");var WASM_DYLINK_MEM_INFO=1;var WASM_DYLINK_NEEDED=2;var WASM_DYLINK_EXPORT_INFO=3;var WASM_DYLINK_IMPORT_INFO=4;var WASM_SYMBOL_TLS=256;var WASM_SYMBOL_BINDING_MASK=3;var WASM_SYMBOL_BINDING_WEAK=1;while(offset<end){var subsectionType=getU8();var subsectionSize=getLEB();if(subsectionType===WASM_DYLINK_MEM_INFO){customSection.memorySize=getLEB();customSection.memoryAlign=getLEB();customSection.tableSize=getLEB();customSection.tableAlign=getLEB()}else if(subsectionType===WASM_DYLINK_NEEDED){var neededDynlibsCount=getLEB();for(var i=0;i<neededDynlibsCount;++i){libname=getString();customSection.neededDynlibs.push(libname)}}else if(subsectionType===WASM_DYLINK_EXPORT_INFO){var count=getLEB();while(count--){var symname=getString();var flags=getLEB();if(flags&WASM_SYMBOL_TLS){customSection.tlsExports.add(symname)}}}else if(subsectionType===WASM_DYLINK_IMPORT_INFO){var count=getLEB();while(count--){var modname=getString();var symname=getString();var flags=getLEB();if((flags&WASM_SYMBOL_BINDING_MASK)==WASM_SYMBOL_BINDING_WEAK){customSection.weakImports.add(symname)}}}else{offset+=subsectionSize}}}return customSection};var newDSO=(name,handle,syms)=>{var dso={refcount:Infinity,name:name,exports:syms,global:true};LDSO.loadedLibsByName[name]=dso;if(handle!=undefined){LDSO.loadedLibsByHandle[handle]=dso}return dso};var LDSO={loadedLibsByName:{},loadedLibsByHandle:{},init(){newDSO("__main__",0,wasmImports)}};var ___heap_base=308656;var zeroMemory=(address,size)=>{HEAPU8.fill(0,address,address+size);return address};var alignMemory=(size,alignment)=>Math.ceil(size/alignment)*alignment;var getMemory=size=>{if(runtimeInitialized){return zeroMemory(_malloc(size),size)}var ret=___heap_base;var end=ret+alignMemory(size,16);___heap_base=end;GOT["__heap_base"].value=end;return ret};var isInternalSym=symName=>["__cpp_exception","__c_longjmp","__wasm_apply_data_relocs","__dso_handle","__tls_size","__tls_align","__set_stack_limits","_emscripten_tls_init","__wasm_init_tls","__wasm_call_ctors","__start_em_asm","__stop_em_asm","__start_em_js","__stop_em_js"].includes(symName)||symName.startsWith("__em_js__");var uleb128Encode=(n,target)=>{if(n<128){target.push(n)}else{target.push(n%128|128,n>>7)}};var sigToWasmTypes=sig=>{var typeNames={i:"i32",j:"i64",f:"f32",d:"f64",e:"externref",p:"i32"};var type={parameters:[],results:sig[0]=="v"?[]:[typeNames[sig[0]]]};for(var i=1;i<sig.length;++i){type.parameters.push(typeNames[sig[i]])}return type};var generateFuncType=(sig,target)=>{var sigRet=sig.slice(0,1);var sigParam=sig.slice(1);var typeCodes={i:127,p:127,j:126,f:125,d:124,e:111};target.push(96);uleb128Encode(sigParam.length,target);for(var i=0;i<sigParam.length;++i){target.push(typeCodes[sigParam[i]])}if(sigRet=="v"){target.push(0)}else{target.push(1,typeCodes[sigRet])}};var convertJsFunctionToWasm=(func,sig)=>{if(typeof WebAssembly.Function=="function"){return new WebAssembly.Function(sigToWasmTypes(sig),func)}var typeSectionBody=[1];generateFuncType(sig,typeSectionBody);var bytes=[0,97,115,109,1,0,0,0,1];uleb128Encode(typeSectionBody.length,bytes);bytes.push(...typeSectionBody);bytes.push(2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0);var module=new WebAssembly.Module(new Uint8Array(bytes));var instance=new WebAssembly.Instance(module,{e:{f:func}});var wrappedFunc=instance.exports["f"];return wrappedFunc};var wasmTable=new WebAssembly.Table({initial:1,element:"anyfunc"});var getWasmTableEntry=funcPtr=>wasmTable.get(funcPtr);var updateTableMap=(offset,count)=>{if(functionsInTableMap){for(var i=offset;i<offset+count;i++){var item=getWasmTableEntry(i);if(item){functionsInTableMap.set(item,i)}}}};var functionsInTableMap;var getFunctionAddress=func=>{if(!functionsInTableMap){functionsInTableMap=new WeakMap;updateTableMap(0,wasmTable.length)}return functionsInTableMap.get(func)||0};var freeTableIndexes=[];var getEmptyTableSlot=()=>{if(freeTableIndexes.length){return freeTableIndexes.pop()}try{wasmTable.grow(1)}catch(err){if(!(err instanceof RangeError)){throw err}throw"Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."}return wasmTable.length-1};var setWasmTableEntry=(idx,func)=>wasmTable.set(idx,func);var addFunction=(func,sig)=>{var rtn=getFunctionAddress(func);if(rtn){return rtn}var ret=getEmptyTableSlot();try{setWasmTableEntry(ret,func)}catch(err){if(!(err instanceof TypeError)){throw err}var wrapped=convertJsFunctionToWasm(func,sig);setWasmTableEntry(ret,wrapped)}functionsInTableMap.set(func,ret);return ret};var updateGOT=(exports,replace)=>{for(var symName in exports){if(isInternalSym(symName)){continue}var value=exports[symName];if(symName.startsWith("orig$")){symName=symName.split("$")[1];replace=true}GOT[symName]||=new WebAssembly.Global({value:"i32",mutable:true});if(replace||GOT[symName].value==0){if(typeof value=="function"){GOT[symName].value=addFunction(value)}else if(typeof value=="number"){GOT[symName].value=value}else{err(`unhandled export type for '${symName}': ${typeof value}`)}}}};var relocateExports=(exports,memoryBase,replace)=>{var relocated={};for(var e in exports){var value=exports[e];if(typeof value=="object"){value=value.value}if(typeof value=="number"){value+=memoryBase}relocated[e]=value}updateGOT(relocated,replace);return relocated};var isSymbolDefined=symName=>{var existing=wasmImports[symName];if(!existing||existing.stub){return false}return true};var resolveGlobalSymbol=(symName,direct=false)=>{var sym;if(direct&&"orig$"+symName in wasmImports){symName="orig$"+symName}if(isSymbolDefined(symName)){sym=wasmImports[symName]}return{sym:sym,name:symName}};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var loadWebAssemblyModule=(binary,flags,libName,localScope,handle)=>{var metadata=getDylinkMetadata(binary);currentModuleWeakSymbols=metadata.weakImports;function loadModule(){var firstLoad=!handle||!HEAP8[handle+8];if(firstLoad){var memAlign=Math.pow(2,metadata.memoryAlign);var memoryBase=metadata.memorySize?alignMemory(getMemory(metadata.memorySize+memAlign),memAlign):0;var tableBase=metadata.tableSize?wasmTable.length:0;if(handle){HEAP8[handle+8]=1;HEAPU32[handle+12>>2]=memoryBase;HEAP32[handle+16>>2]=metadata.memorySize;HEAPU32[handle+20>>2]=tableBase;HEAP32[handle+24>>2]=metadata.tableSize}}else{memoryBase=HEAPU32[handle+12>>2];tableBase=HEAPU32[handle+20>>2]}var tableGrowthNeeded=tableBase+metadata.tableSize-wasmTable.length;if(tableGrowthNeeded>0){wasmTable.grow(tableGrowthNeeded)}var moduleExports;function resolveSymbol(sym){var resolved=resolveGlobalSymbol(sym).sym;if(!resolved&&localScope){resolved=localScope[sym]}if(!resolved){resolved=moduleExports[sym]}return resolved}var proxyHandler={get(stubs,prop){switch(prop){case"__memory_base":return memoryBase;case"__table_base":return tableBase}if(prop in wasmImports&&!wasmImports[prop].stub){return wasmImports[prop]}if(!(prop in stubs)){var resolved;stubs[prop]=(...args)=>{resolved||=resolveSymbol(prop);return resolved(...args)}}return stubs[prop]}};var proxy=new Proxy({},proxyHandler);var info={"GOT.mem":new Proxy({},GOTHandler),"GOT.func":new Proxy({},GOTHandler),env:proxy,wasi_snapshot_preview1:proxy};function postInstantiation(module,instance){updateTableMap(tableBase,metadata.tableSize);moduleExports=relocateExports(instance.exports,memoryBase);if(!flags.allowUndefined){reportUndefinedSymbols()}function addEmAsm(addr,body){var args=[];var arity=0;for(;arity<16;arity++){if(body.indexOf("$"+arity)!=-1){args.push("$"+arity)}else{break}}args=args.join(",");var func=`(${args}) => { ${body} };`;abort("DYNAMIC_EXECUTION=0 was set, cannot eval")}if("__start_em_asm"in moduleExports){var start=moduleExports["__start_em_asm"];var stop=moduleExports["__stop_em_asm"];while(start<stop){var jsString=UTF8ToString(start);addEmAsm(start,jsString);start=HEAPU8.indexOf(0,start)+1}}function addEmJs(name,cSig,body){var jsArgs=[];cSig=cSig.slice(1,-1);if(cSig!="void"){cSig=cSig.split(",");for(var i in cSig){var jsArg=cSig[i].split(" ").pop();jsArgs.push(jsArg.replace("*",""))}}var func=`(${jsArgs}) => ${body};`;abort("DYNAMIC_EXECUTION=0 was set, cannot eval")}for(var name in moduleExports){if(name.startsWith("__em_js__")){var start=moduleExports[name];var jsString=UTF8ToString(start);var parts=jsString.split("<::>");addEmJs(name.replace("__em_js__",""),parts[0],parts[1]);delete moduleExports[name]}}var applyRelocs=moduleExports["__wasm_apply_data_relocs"];if(applyRelocs){if(runtimeInitialized){applyRelocs()}else{__RELOC_FUNCS__.push(applyRelocs)}}var init=moduleExports["__wasm_call_ctors"];if(init){if(runtimeInitialized){init()}else{__ATINIT__.push(init)}}return moduleExports}if(flags.loadAsync){if(binary instanceof WebAssembly.Module){var instance=new WebAssembly.Instance(binary,info);return Promise.resolve(postInstantiation(binary,instance))}return WebAssembly.instantiate(binary,info).then(result=>postInstantiation(result.module,result.instance))}var module=binary instanceof WebAssembly.Module?binary:new WebAssembly.Module(binary);var instance=new WebAssembly.Instance(module,info);return postInstantiation(module,instance)}if(flags.loadAsync){return metadata.neededDynlibs.reduce((chain,dynNeeded)=>chain.then(()=>loadDynamicLibrary(dynNeeded,flags)),Promise.resolve()).then(loadModule)}metadata.neededDynlibs.forEach(needed=>loadDynamicLibrary(needed,flags,localScope));return loadModule()};var mergeLibSymbols=(exports,libName)=>{for(var[sym,exp]of Object.entries(exports)){const setImport=target=>{if(!isSymbolDefined(target)){wasmImports[target]=exp}};setImport(sym);const main_alias="__main_argc_argv";if(sym=="main"){setImport(main_alias)}if(sym==main_alias){setImport("main")}if(sym.startsWith("dynCall_")&&!Module.hasOwnProperty(sym)){Module[sym]=exp}}};var asyncLoad=(url,onload,onerror,noRunDep)=>{var dep=!noRunDep?getUniqueRunDependency(`al ${url}`):"";readAsync(url,arrayBuffer=>{onload(new Uint8Array(arrayBuffer));if(dep)removeRunDependency(dep)},event=>{if(onerror){onerror()}else{throw`Loading data file "${url}" failed.`}});if(dep)addRunDependency(dep)};function loadDynamicLibrary(libName,flags={global:true,nodelete:true},localScope,handle){var dso=LDSO.loadedLibsByName[libName];if(dso){if(!flags.global){if(localScope){Object.assign(localScope,dso.exports)}}else if(!dso.global){dso.global=true;mergeLibSymbols(dso.exports,libName)}if(flags.nodelete&&dso.refcount!==Infinity){dso.refcount=Infinity}dso.refcount++;if(handle){LDSO.loadedLibsByHandle[handle]=dso}return flags.loadAsync?Promise.resolve(true):true}dso=newDSO(libName,handle,"loading");dso.refcount=flags.nodelete?Infinity:1;dso.global=flags.global;function loadLibData(){if(handle){var data=HEAPU32[handle+28>>2];var dataSize=HEAPU32[handle+32>>2];if(data&&dataSize){var libData=HEAP8.slice(data,data+dataSize);return flags.loadAsync?Promise.resolve(libData):libData}}var libFile=locateFile(libName);if(flags.loadAsync){return new Promise(function(resolve,reject){asyncLoad(libFile,resolve,reject)})}if(!readBinary){throw new Error(`${libFile}: file not found, and synchronous loading of external files is not available`)}return readBinary(libFile)}function getExports(){if(flags.loadAsync){return loadLibData().then(libData=>loadWebAssemblyModule(libData,flags,libName,localScope,handle))}return loadWebAssemblyModule(loadLibData(),flags,libName,localScope,handle)}function moduleLoaded(exports){if(dso.global){mergeLibSymbols(exports,libName)}else if(localScope){Object.assign(localScope,exports)}dso.exports=exports}if(flags.loadAsync){return getExports().then(exports=>{moduleLoaded(exports);return true})}moduleLoaded(getExports());return true}var reportUndefinedSymbols=()=>{for(var[symName,entry]of Object.entries(GOT)){if(entry.value==0){var value=resolveGlobalSymbol(symName,true).sym;if(!value&&!entry.required){continue}if(typeof value=="function"){entry.value=addFunction(value,value.sig)}else if(typeof value=="number"){entry.value=value}else{throw new Error(`bad export type for '${symName}': ${typeof value}`)}}}};var loadDylibs=()=>{if(!dynamicLibraries.length){reportUndefinedSymbols();return}addRunDependency("loadDylibs");dynamicLibraries.reduce((chain,lib)=>chain.then(()=>loadDynamicLibrary(lib,{loadAsync:true,global:true,nodelete:true,allowUndefined:true})),Promise.resolve()).then(()=>{reportUndefinedSymbols();removeRunDependency("loadDylibs")})};var ___assert_fail=(condition,filename,line,func)=>{abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])};___assert_fail.sig="vppip";var ___memory_base=new WebAssembly.Global({value:"i32",mutable:false},4096);var ___stack_pointer=new WebAssembly.Global({value:"i32",mutable:true},308656);var ___table_base=new WebAssembly.Global({value:"i32",mutable:false},1);var __abort_js=()=>{abort("")};__abort_js.sig="v";var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);__emscripten_memcpy_js.sig="vppp";var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runMainThreadEmAsm=(emAsmAddr,sigPtr,argbuf,sync)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[emAsmAddr](...args)};var _emscripten_asm_const_async_on_main_thread=(emAsmAddr,sigPtr,argbuf)=>runMainThreadEmAsm(emAsmAddr,sigPtr,argbuf,0);_emscripten_asm_const_async_on_main_thread.sig="vppp";var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);_emscripten_asm_const_int.sig="ippp";var getHeapMax=()=>2147483648;var growMemory=size=>{var b=wasmMemory.buffer;var pages=(size-b.byteLength+65535)/65536;try{wasmMemory.grow(pages);updateMemoryViews();return 1}catch(e){}};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}var alignUp=(x,multiple)=>x+(multiple-x%multiple)%multiple;for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize+131072/cutDown;var newSize=Math.min(maxHeapSize,alignUp(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=growMemory(newSize);if(replacement){return true}}return false};_emscripten_resize_heap.sig="ip";var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){ABORT=true}quit_(code,new ExitStatus(code))};_proc_exit.sig="vi";var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var lengthBytesUTF8=str=>{var len=0;for(var i=0;i<str.length;++i){var c=str.charCodeAt(i);if(c<=127){len++}else if(c<=2047){len+=2}else if(c>=55296&&c<=57343){len+=4;++i}else{len+=3}}return len};var stringToUTF8Array=(str,heap,outIdx,maxBytesToWrite)=>{if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx};var stringToUTF8=(str,outPtr,maxBytesToWrite)=>stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite);var stackAlloc=sz=>__emscripten_stack_alloc(sz);var stringToUTF8OnStack=str=>{var size=lengthBytesUTF8(str)+1;var ret=stackAlloc(size);stringToUTF8(str,ret,size);return ret};var wasmImports={__assert_fail:___assert_fail,__heap_base:___heap_base,__indirect_function_table:wasmTable,__memory_base:___memory_base,__stack_pointer:___stack_pointer,_abort_js:__abort_js,_emscripten_memcpy_js:__emscripten_memcpy_js,emscripten_asm_const_async_on_main_thread:_emscripten_asm_const_async_on_main_thread,emscripten_asm_const_int:_emscripten_asm_const_int,emscripten_resize_heap:_emscripten_resize_heap,memory:wasmMemory};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["__wasm_call_ctors"])();var ___wasm_apply_data_relocs=()=>(___wasm_apply_data_relocs=wasmExports["__wasm_apply_data_relocs"])();var _decrypt_chachapoly_asymmetric=Module["_decrypt_chachapoly_asymmetric"]=(a0,a1,a2,a3,a4,a5,a6)=>(_decrypt_chachapoly_asymmetric=Module["_decrypt_chachapoly_asymmetric"]=wasmExports["decrypt_chachapoly_asymmetric"])(a0,a1,a2,a3,a4,a5,a6);var _malloc=Module["_malloc"]=a0=>(_malloc=Module["_malloc"]=wasmExports["malloc"])(a0);var _free=Module["_free"]=a0=>(_free=Module["_free"]=wasmExports["free"])(a0);var _decrypt_chachapoly_symmetric=Module["_decrypt_chachapoly_symmetric"]=(a0,a1,a2,a3,a4,a5)=>(_decrypt_chachapoly_symmetric=Module["_decrypt_chachapoly_symmetric"]=wasmExports["decrypt_chachapoly_symmetric"])(a0,a1,a2,a3,a4,a5);var _encrypt_chachapoly_asymmetric=Module["_encrypt_chachapoly_asymmetric"]=(a0,a1,a2,a3,a4,a5,a6)=>(_encrypt_chachapoly_asymmetric=Module["_encrypt_chachapoly_asymmetric"]=wasmExports["encrypt_chachapoly_asymmetric"])(a0,a1,a2,a3,a4,a5,a6);var _encrypt_chachapoly_symmetric=Module["_encrypt_chachapoly_symmetric"]=(a0,a1,a2,a3,a4,a5)=>(_encrypt_chachapoly_symmetric=Module["_encrypt_chachapoly_symmetric"]=wasmExports["encrypt_chachapoly_symmetric"])(a0,a1,a2,a3,a4,a5);var _get_merkle_proof=Module["_get_merkle_proof"]=(a0,a1,a2,a3)=>(_get_merkle_proof=Module["_get_merkle_proof"]=wasmExports["get_merkle_proof"])(a0,a1,a2,a3);var _get_merkle_root=Module["_get_merkle_root"]=(a0,a1,a2)=>(_get_merkle_root=Module["_get_merkle_root"]=wasmExports["get_merkle_root"])(a0,a1,a2);var _get_merkle_root_from_proof=Module["_get_merkle_root_from_proof"]=(a0,a1,a2,a3)=>(_get_merkle_root_from_proof=Module["_get_merkle_root_from_proof"]=wasmExports["get_merkle_root_from_proof"])(a0,a1,a2,a3);var _verify_merkle_proof=Module["_verify_merkle_proof"]=(a0,a1,a2,a3)=>(_verify_merkle_proof=Module["_verify_merkle_proof"]=wasmExports["verify_merkle_proof"])(a0,a1,a2,a3);var _restore_secret=Module["_restore_secret"]=(a0,a1,a2,a3)=>(_restore_secret=Module["_restore_secret"]=wasmExports["restore_secret"])(a0,a1,a2,a3);var _split_secret=Module["_split_secret"]=(a0,a1,a2,a3,a4)=>(_split_secret=Module["_split_secret"]=wasmExports["split_secret"])(a0,a1,a2,a3,a4);var _random_bytes=Module["_random_bytes"]=(a0,a1)=>(_random_bytes=Module["_random_bytes"]=wasmExports["random_bytes"])(a0,a1);var _argon2=Module["_argon2"]=(a0,a1,a2,a3)=>(_argon2=Module["_argon2"]=wasmExports["argon2"])(a0,a1,a2,a3);var _keypair=Module["_keypair"]=(a0,a1)=>(_keypair=Module["_keypair"]=wasmExports["keypair"])(a0,a1);var _keypair_from_seed=Module["_keypair_from_seed"]=(a0,a1,a2)=>(_keypair_from_seed=Module["_keypair_from_seed"]=wasmExports["keypair_from_seed"])(a0,a1,a2);var _keypair_from_secret_key=Module["_keypair_from_secret_key"]=(a0,a1)=>(_keypair_from_secret_key=Module["_keypair_from_secret_key"]=wasmExports["keypair_from_secret_key"])(a0,a1);var _sign=Module["_sign"]=(a0,a1,a2,a3)=>(_sign=Module["_sign"]=wasmExports["sign"])(a0,a1,a2,a3);var _verify=Module["_verify"]=(a0,a1,a2,a3)=>(_verify=Module["_verify"]=wasmExports["verify"])(a0,a1,a2,a3);var _random_number_in_range=Module["_random_number_in_range"]=(a0,a1)=>(_random_number_in_range=Module["_random_number_in_range"]=wasmExports["random_number_in_range"])(a0,a1);var _sha512=Module["_sha512"]=(a0,a1,a2)=>(_sha512=Module["_sha512"]=wasmExports["sha512"])(a0,a1,a2);var _commit=Module["_commit"]=(a0,a1,a2)=>(_commit=Module["_commit"]=wasmExports["commit"])(a0,a1,a2);var _generate_identities=Module["_generate_identities"]=(a0,a1,a2,a3,a4)=>(_generate_identities=Module["_generate_identities"]=wasmExports["generate_identities"])(a0,a1,a2,a3,a4);var _generate_proof=Module["_generate_proof"]=(a0,a1,a2,a3,a4,a5,a6,a7)=>(_generate_proof=Module["_generate_proof"]=wasmExports["generate_proof"])(a0,a1,a2,a3,a4,a5,a6,a7);var _verify_proof=Module["_verify_proof"]=(a0,a1,a2)=>(_verify_proof=Module["_verify_proof"]=wasmExports["verify_proof"])(a0,a1,a2);var __emscripten_stack_alloc=a0=>(__emscripten_stack_alloc=wasmExports["_emscripten_stack_alloc"])(a0);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args=[]){var entryFunction=resolveGlobalSymbol("main").sym;if(!entryFunction)return;args.unshift(thisProgram);var argc=args.length;var argv=stackAlloc((argc+1)*4);var argv_ptr=argv;args.forEach(arg=>{HEAPU32[argv_ptr>>2]=stringToUTF8OnStack(arg);argv_ptr+=4});HEAPU32[argv_ptr>>2]=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(args=arguments_){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();readyPromiseResolve(Module);if(shouldRunNow)callMain(args);postRun()}{doRun()}}var shouldRunNow=false;run();moduleRtn=readyPromise;


  return moduleRtn;
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = libdemos;
else if (typeof define === 'function' && define['amd'])
  define([], () => libdemos);