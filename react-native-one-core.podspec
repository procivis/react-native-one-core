require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))
sdk = JSON.parse(File.read(File.join(__dir__, 'core-sdk.json')))['ios']

Pod::Spec.new do |s|

  s.name                    = "react-native-one-core"
  s.version                 = package['version']
  s.summary                 = package['description']
  s.license                 = package['license']
  s.authors                 = package['author']
  s.homepage                = package['homepage']

  s.platform                = :ios, "13.0"
  s.source                  = { :git => "https://gitlab.procivis.ch/procivis/one/react-native-one-core.git" }
  s.source_files            = "ios/**/*.{h,m,swift}"
  s.requires_arc            = true
  s.ios.vendored_frameworks = "ios/ProcivisOneCore.xcframework", "ios/ProcivisOneCoreFFI.xcframework"
  s.prepare_command         = <<-CMD
                              FRAMEWORK_URL=#{sdk['url']}
                              SHA_1_CHECKSUM=#{sdk['sha1']}
                              if [ ! -d ./ios/ProcivisOneCore.xcframework ]; then
                                echo "Downloading ONE Core Framework"
                                curl -L -o ./ios/deploy.zip $FRAMEWORK_URL
                                pushd ./ios >/dev/null
                                if ! echo "$SHA_1_CHECKSUM *deploy.zip" | shasum -c -s; then
                                  echo !!!!!!!!!!!!!!!!!
                                  echo ERROR: Downloaded Framwork CRC Mismatch
                                  echo Expected: $SHA_1_CHECKSUM
                                  echo 'Actual:  ' `shasum -b deploy.zip`
                                  echo !!!!!!!!!!!!!!!!!
                                  exit 2
                                fi
                                popd >/dev/null
                                unzip ./ios/deploy.zip "ios/*" >/dev/null
                                rm ./ios/deploy.zip
                              fi
                              CMD

  s.dependency "React-Core"

end

  