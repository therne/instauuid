{
  "targets": [
    {
      "target_name": "generator",
      "cflags": [
        "-std=c++0x"
      ],
      "conditions": [
        ["OS==\"mac\"", {
          "xcode_settings": {
            "OTHER_CPLUSPLUSFLAGS" : ["-stdlib=libc++", "-Wc++11-extensions"],
            "MACOSX_DEPLOYMENT_TARGET": "10.7"
          },
        }],
      ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ],
      "sources": ["generator.cc"]
    }
  ]
}
