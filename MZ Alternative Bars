//=============================================================================
// RPG Maker MZ - Alternative Bars
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Allows you to customise the HP/MP bars etc.
 * @author Fomar0153
 *
 * @param Display Max Value
 * @type boolean
 * @desc Would you like to display the max values?
 * @default true
 *
 * @param Display Value Position
 * @type select
 * @option center
 * @option left
 * @option right
 * @desc Where would you like to display the values?
 * @default center
 *
 * @param Bar Thickness
 * @type integer
 * @desc 12 is the original thickness.
 * @default 12
 *
 * @param Bar Vertical Align
 * @type select
 * @option middle
 * @option default
 * @desc Choose your bar's vertical position.
 * @default middle
 *
 * @param Label Offset Y
 * @type integer
 * @desc Adjust the label's Y position manually.
 * @default 0
 *
 * @param Bar Offset Y
 * @type integer
 * @desc Adjust the bar's Y position manually.
 * @default 0
 *
 *
 * @help Fomar0153_AltBars.js
 *
 * This plugin provides options for customising the default bars.
 *
 */

var Fomar = Fomar || {};
Fomar.AltBars = {};

Fomar.AltBars.parameters = PluginManager.parameters('Fomar0153_AltBars');

Fomar.AltBars.displayMaxValue = (Fomar.AltBars.parameters["Display Max Value"] == "true");
Fomar.AltBars.displayValuePosition = Fomar.AltBars.parameters["Display Value Position"];
Fomar.AltBars.guageHeight = parseInt(Fomar.AltBars.parameters["Bar Thickness"]);
Fomar.AltBars.guageVerticalAlign = Fomar.AltBars.parameters["Bar Vertical Align"];
Fomar.AltBars.labelOffsetY = parseInt(Fomar.AltBars.parameters["Label Offset Y"]);
Fomar.AltBars.guageOffsetY = parseInt(Fomar.AltBars.parameters["Bar Offset Y"]);

(() => {

  Sprite_Gauge.prototype.drawValue = function() {
    const currentValue = this.currentValue();
    const maxValue = this.currentMaxValue();
    const width = this.bitmapWidth() - this.gaugeX();
    const height = this.bitmapHeight();
    this.setupValueFont();
    var y = 0;
    if (Fomar.AltBars.guageVerticalAlign == "middle") {
      y = this.labelY();
    }
    y += Fomar.AltBars.labelOffsetY;
    if (Fomar.AltBars.displayMaxValue) {
      this.bitmap.drawText(currentValue + "/" + maxValue, this.gaugeX(), y, width, height, Fomar.AltBars.displayValuePosition);
    } else {
      this.bitmap.drawText(currentValue, this.gaugeX(), y, width, height, Fomar.AltBars.displayValuePosition);
    }
  };

  Sprite_Gauge.prototype.gaugeHeight = function() {
    return Fomar.AltBars.guageHeight;
  };

  Fomar.AltBars.Sprite_Gauge_drawGaugeRect = Sprite_Gauge.prototype.drawGaugeRect;
  Sprite_Gauge.prototype.drawGaugeRect = function(x, y, width, height) {
    switch (Fomar.AltBars.guageVerticalAlign) {
      case "middle":
        Fomar.AltBars.Sprite_Gauge_drawGaugeRect.call(this, x, (this.bitmapHeight() - this.gaugeHeight()) / 2 + this.labelY() / 2 + Fomar.AltBars.guageOffsetY, width, height);
        break;
      default:
        Fomar.AltBars.Sprite_Gauge_drawGaugeRect.call(this, x, y + Fomar.AltBars.guageOffsetY, width, height);
    }
  };

})();
