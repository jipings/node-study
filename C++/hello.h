#include <node.h>

using namespace v8;

class AddonData {
 public:
  AddonData(Isolate* isolate, Local<Object> exports):
      call_count(0) {
    // 将次对象的实例挂到exports上
    exports_.Reset(isolate, exports);
    exports_.SetWeak(this, DeleteMe, WeakCallbackType::kParameter);
  }

  ~AddonData() {
    if (!exports_.IsEmpty()) {
      // 重新设置引用以避免数据泄露
      exports_.ClearWeak();
      exports_.Reset();
    }
  }

  // Per-addon 数据
  int call_count;

 private:
  // exports即将被回收时调用的方法
  static void DeleteMe(const WeakCallbackInfo<AddonData>& info) {
    delete info.GetParameter();
  }

  // exports对象弱句柄。该类的实例将与其若绑定的`exports`对象一起销毁
  v8::Persistent<v8::Object> exports_;
};

static void Method(const v8::FunctionCallbackInfo<v8::Value>& info) {
  // 恢复per-addon-instance数据
  AddonData* data =
      reinterpret_cast<AddonData*>(info.Data().As<External>()->Value());
  data->call_count++;
  info.GetReturnValue().Set((double)data->call_count);
}

// context-aware 初始化
NODE_MODULE_INIT(/* exports, module, context */) {
  Isolate* isolate = context->GetIsolate();

  // 为该扩展实例的AddonData创建一个新的实例
  AddonData* data = new AddonData(isolate, exports);
  // 在v8::External中包裹数据，这样我们就可以将它传递给我们暴露的方法
  Local<External> external = External::New(isolate, data);

  // 把"Method"方法暴露给JavaScript，并确保其接收我们通过把`external`作为FunctionTemplate构造函数第三个参数时创建的    per-addon-instance数据
  exports->Set(context,
               String::NewFromUtf8(isolate, "method", NewStringType::kNormal)
                  .ToLocalChecked(),
               FunctionTemplate::New(isolate, Method, external)
                  ->GetFunction(context).ToLocalChecked()).FromJust();
}