/**
 * Instagram-Style UUID generator
 */
#include <chrono>
#include <v8.h>
#include <nan.h>

using v8::String;
using v8::FunctionTemplate;
using Nan::GetFunction;
using Nan::CopyBuffer;
using Nan::New;
using Nan::Set;

// Date starts 2015-01-01 
#define EPOCH 1420038000000L

typedef unsigned long long UINT64;
typedef unsigned short WORD;

UINT64 generate(WORD counter, WORD additional=0) {
    auto now = std::chrono::system_clock::now().time_since_epoch().count();
    UINT64 id = (UINT64)(now / 1000) << (64-41);

    // aditional number (13 bit : 0~8191) - use microseconds if not exist
    id |= (additional != 0 ? additional : now % 1000) << (64-41-13);

    // counter number (10 bit : 0~1023)
    id |= counter % 1024;

    return id;
}

/**
 * Method wrapping for node export.
 */
NAN_METHOD(Generate) {
    UINT64 euid = info.Length() > 1 \
        ? generate((WORD) info[0]->Uint32Value(), (WORD) info[1]->Uint32Value()) \
        : generate((WORD) info[0]->Uint32Value());

    // pass it to buffer
    auto buffer = CopyBuffer((char*)(&euid), 8);
    info.GetReturnValue().Set(buffer.ToLocalChecked());
}

NAN_MODULE_INIT(Init) {
    Set(target, New<String>("generate").ToLocalChecked(),
        GetFunction(New<FunctionTemplate>(Generate)).ToLocalChecked());
}

NODE_MODULE(generator, Init);
