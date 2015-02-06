/**
 * Instagram-Style UUID generator
 */
#include <chrono>
#include <v8.h>
#include <nan.h>
using namespace v8;

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
    NanScope();
    auto euid = args.Length() > 1 \
        ? generate((WORD) args[0]->NumberValue(), (WORD) args[1]->NumberValue()) \
        : generate((WORD) args[0]->NumberValue());

    // pass it to buffer
    auto buffer = NanNewBufferHandle((char*)(&euid), 8);
    NanReturnValue(buffer);
}

void init(Handle<Object> exports) {
    exports->Set(NanNew<String>("generate"), NanNew<FunctionTemplate>(Generate)->GetFunction());
}

NODE_MODULE(generator, init);
