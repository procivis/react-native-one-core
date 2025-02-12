#import <React/RCTComponent.h>
#import <React/RCTViewManager.h>
#import <UBQKit/UBQKit.h>
#import "react_native_one_core-Swift.h"

@interface RSEPinPadManager : RCTViewManager
@end

@implementation RSEPinPadManager

RCT_EXPORT_MODULE(RCTProcivisRSEPinPad)

- (UIView *)view
{
    RSEPinPad *pinPad = [RSEPinPad new];
    return pinPad;
}

@end
