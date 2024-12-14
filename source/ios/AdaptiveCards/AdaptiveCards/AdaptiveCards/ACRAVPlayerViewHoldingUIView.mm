//
//  ACRAVPlayerViewHoldingUIView
//  ACRAVPlayerViewHoldingUIView.mm
//
//  Copyright © 2018 Microsoft. All rights reserved.
//

#import "ACRAVPlayerViewHoldingUIView.h"

@implementation ACRAVPlayerViewHoldingUIView

- (void)layoutSubviews
{
    [super layoutSubviews];

    if (!_hidePlayIcon) {
        CGFloat radius = 30.0f;
        CGPoint centerPoint = CGPointMake((self.frame.size.width) / 2, (self.frame.size.height) / 2);

        UIBezierPath *circlePath = [UIBezierPath bezierPathWithOvalInRect:CGRectMake(centerPoint.x - radius, centerPoint.y - radius, 2 * radius, 2 * radius)];
        [circlePath closePath];
        CAShapeLayer *canvas = [[CAShapeLayer alloc] init];

        canvas.path = circlePath.CGPath;
        canvas.fillColor = UIColor.grayColor.CGColor;
        canvas.fillRule = kCAFillRuleNonZero;
        canvas.lineCap = kCALineCapButt;
        canvas.lineDashPattern = nil;
        canvas.lineDashPhase = 0.0;
        canvas.lineJoin = kCALineJoinMiter;
        canvas.lineWidth = 1.0;
        canvas.miterLimit = 10.0;
        canvas.strokeColor = canvas.fillColor;

        CGFloat triangleHeight = radius;
        CGFloat triangleSide = (2 / 1.731) * triangleHeight;
        CGFloat offset = 5.0f;

        UIBezierPath *trianglePath = [UIBezierPath bezierPath];
        [trianglePath moveToPoint:CGPointMake(centerPoint.x - triangleHeight / 2 + offset, centerPoint.y - triangleSide / 2)];
        [trianglePath addLineToPoint:CGPointMake(centerPoint.x + triangleHeight / 2 + offset, centerPoint.y)];
        [trianglePath addLineToPoint:CGPointMake(centerPoint.x - triangleHeight / 2 + offset, centerPoint.y + triangleSide / 2)];
        [trianglePath addLineToPoint:CGPointMake(centerPoint.x - triangleHeight / 2 + offset, centerPoint.y - triangleSide / 2)];
        [trianglePath closePath];

        CAShapeLayer *triangleCanvas = [[CAShapeLayer alloc] init];
        triangleCanvas.path = trianglePath.CGPath;
        triangleCanvas.fillColor = UIColor.whiteColor.CGColor;
        triangleCanvas.fillRule = kCAFillRuleNonZero;
        triangleCanvas.lineCap = kCALineCapButt;
        triangleCanvas.lineDashPattern = nil;
        triangleCanvas.lineDashPhase = 0.0;
        triangleCanvas.lineJoin = kCALineJoinMiter;
        triangleCanvas.lineWidth = 1.0;
        triangleCanvas.miterLimit = 10.0;
        triangleCanvas.strokeColor = canvas.fillColor;

        [canvas setName:@"circle"];
        [triangleCanvas setName:@"triangle"];
        [self.layer addSublayer:canvas];
        [self.layer addSublayer:triangleCanvas];
    } else {
        NSMutableArray<CALayer *> *shapes = [[NSMutableArray alloc] init];
        for (CALayer *layer in [self.layer sublayers]) {
            if ([[layer name] isEqualToString:@"circle"] ||
                [[layer name] isEqualToString:@"triangle"]) {
                [shapes addObject:layer];
            }
        }

        for (CALayer *layer in shapes) {
            [layer removeFromSuperlayer];
        }
    }
}

@end
