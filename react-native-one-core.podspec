Pod::Spec.new do |s|

  s.name                    = "react-native-one-core"
  s.version                 = "1.0.0"
  s.summary                 = "JWT React Native SDK"
  s.description             = <<-DESC
                              React Native library with ONE core bindings
                              DESC
  s.homepage                = "https://procivis.ch"
  s.license                 = "MIT"
  s.author                  = { "author" => "zarecky@procivis.ch" }
  s.platform                = :ios, "10.0"
  s.source                  = { :git => "https://gitlab.procivis.ch/procivis/one/react-native-one-core.git" }
  s.source_files            = "ios/**/*.{h,m,swift}"
  s.requires_arc            = true
  s.ios.vendored_frameworks = "ios/one_coreFFI.xcframework"
  s.prepare_command         = <<-CMD
                              if [ ! -d ./ios/one_coreFFI.xcframework ]; then
                                FRAMEWORK_URL=http://localhost:9800/deploy.zip
                                SHA_CRC=2a66fd4ff810872cfd6f219d9d5b091b0f35a4c7

                                echo "Downloading ONE Core Framework"
                                curl -L -o ./ios/deploy.zip $FRAMEWORK_URL
                                pushd ./ios >/dev/null
                                if ! echo "$SHA_CRC *deploy.zip" | shasum -c -s; then
                                  echo !!!!!!!!!!!!!!!!!
                                  echo ERROR: Downloaded Framwork CRC Mismatch
                                  echo Expected: $SHA_CRC
                                  echo 'Actual:  ' `shasum -b deploy.zip`
                                  echo !!!!!!!!!!!!!!!!!
                                  exit 2
                                fi
                                popd >/dev/null
                                unzip ./ios/deploy.zip "ios/one_core/Sources/*" >/dev/null
                                mv ./ios/one_core/Sources/one_core/one_core.swift ./ios/one_core.swift
                                mkdir ./ios/one_coreFFI.xcframework
                                mv ./ios/one_core/Sources/one_coreFFI.xcframework/* ./ios/one_coreFFI.xcframework
                                rm -rf ./ios/one_core ./ios/deploy.zip
                              fi
                              CMD

  s.dependency              "React-Core"

end

  