//=============================================================================
// RPG Maker MZ - Casting Bar
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adds a casting bar when using TPB.
 * @author Fomar0153
 *
 * @param Casting Bar Colour 1
 * @type integer
 * @desc Enter a number that refers to the colours on the windowskin.
 * @default 6
 *
 * @param Casting Bar Colour 2
 * @type integer
 * @desc Enter a number that refers to the colours on the windowskin.
 * @default 14
 *
 * @param Always Show Cast Bar
 * @type boolean
 * @desc Always show the cast bar?
 * @default false
 *
 * @param Push Time Charge Bar x Offset
 * @type integer
 * @desc Enter a number if you would like to offset the PT Charge bar.
 * @default 0
 *
 * @param Push Time Charge Bar y Offset
 * @type integer
 * @desc Enter a number if you would like to offset the PT Charge bar.
 * @default 0
 *
 * @param Cast Bar x Offset
 * @type integer
 * @desc Enter a number if you would like to offset the cast bar.
 * @default 0
 *
 * @param Cast Bar y Offset
 * @type integer
 * @desc Enter a number if you would like to offset the cast bar.
 * @default 0
 *
 * @param Cast Bar Width Reduction
 * @type integer
 * @desc Enter a number if you would like to make the cast bar smaller.
 * @default 0
 *
 * @help Fomar0153_AltBattleHUD.js
 *
 * This plugin adds a casting bar to the TPB system
 * giving players a visual indicator
 *
 */

var Fomar = Fomar || {};
Fomar.CastingBar = {};

Fomar.CastingBar.parameters = PluginManager.parameters('Fomar0153_CastingBar');

Fomar.CastingBar.castingBarColor1 = parseInt(Fomar.CastingBar.parameters["Casting Bar Colour 1"]);
Fomar.CastingBar.castingBarColor2 = parseInt(Fomar.CastingBar.parameters["Casting Bar Colour 2"]);
Fomar.CastingBar.alwaysShowCastBar = (Fomar.CastingBar.parameters["Always Show Cast Bar"]  == "true");
Fomar.CastingBar.timeOffsetX = parseInt(Fomar.CastingBar.parameters["Push Time Charge Bar x Offset"]);
Fomar.CastingBar.timeOffsetY = parseInt(Fomar.CastingBar.parameters["Push Time Charge Bar y Offset"]);
Fomar.CastingBar.castOffsetX = parseInt(Fomar.CastingBar.parameters["Cast Bar x Offset"]);
Fomar.CastingBar.castOffsetY = parseInt(Fomar.CastingBar.parameters["Cast Bar y Offset"]);
Fomar.CastingBar.castWidth = parseInt(Fomar.CastingBar.parameters["Cast Bar Width Reduction"]);

(() => {

  Fomar.CastingBar.Sprite_Gauge_currentValue = Sprite_Gauge.prototype.currentValue;
  Sprite_Gauge.prototype.currentValue = function() {
    if (this._battler && this._statusType == "cast") {
      return this._battler._tpbCastTime;
    } else {
      return Fomar.CastingBar.Sprite_Gauge_currentValue.call(this);
    }
  };

  Fomar.CastingBar.Sprite_Gauge_currentMaxValue = Sprite_Gauge.prototype.currentMaxValue;
  Sprite_Gauge.prototype.currentMaxValue = function() {
    if (this._battler && this._statusType == "cast") {
      return this._battler.tpbRequiredCastTime();
    } else {
      return Fomar.CastingBar.Sprite_Gauge_currentMaxValue.call(this);
    }
  };

  Fomar.CastingBar.Sprite_Gauge_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
  Sprite_Gauge.prototype.gaugeColor1 = function() {
    if (this._battler && this._statusType == "cast") {
      return ColorManager.textColor(Fomar.CastingBar.castingBarColor1);
    } else {
      return Fomar.CastingBar.Sprite_Gauge_gaugeColor1.call(this);
    }
  };

  Fomar.CastingBar.Sprite_Gauge_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
  Sprite_Gauge.prototype.gaugeColor2 = function() {
    if (this._battler && this._statusType == "cast") {
      return ColorManager.textColor(Fomar.CastingBar.castingBarColor2);
    } else {
      return Fomar.CastingBar.Sprite_Gauge_gaugeColor2.call(this);
    }
  };

  Fomar.CastingBar.Window_StatusBase_placeTimeGauge = Window_StatusBase.prototype.placeTimeGauge;
  Window_StatusBase.prototype.placeTimeGauge = function(actor, x, y) {
    Fomar.CastingBar.Window_StatusBase_placeTimeGauge.call(this, actor, x + Fomar.CastingBar.timeOffsetX, y + Fomar.CastingBar.timeOffsetY);
    if (BattleManager.isTpb()) {
      this.placeGauge(actor, "cast", x + Fomar.CastingBar.castOffsetX - Fomar.CastingBar.castWidth, y + Fomar.CastingBar.castOffsetY);
    }
  };

  Fomar.CastingBar.Sprite_Gauge_redraw = Sprite_Gauge.prototype.redraw;
  Sprite_Gauge.prototype.redraw = function() {
    if (this._battler && this._statusType == "cast") {
      this.visible = Fomar.CastingBar.alwaysShowCastBar || (this._battler._tpbState === "casting");
    }
    Fomar.CastingBar.Sprite_Gauge_redraw.call(this);
  };

  Fomar.CastingBar.Sprite_Gauge_drawLabel = Sprite_Gauge.prototype.drawLabel;
  Sprite_Gauge.prototype.drawLabel = function() {
    if (this._statusType === "cast") {
      return;
    }
    Fomar.CastingBar.Sprite_Gauge_drawLabel.call(this);
  };

  Fomar.CastingBar.Sprite_Gauge_drawValue = Sprite_Gauge.prototype.drawValue;
  Sprite_Gauge.prototype.drawValue = function() {
    if (this._statusType === "cast") {
      return;
    }
    Fomar.CastingBar.Sprite_Gauge_drawValue.call(this);
  };

  Fomar.CastingBar.Sprite_Gauge_gaugeX = Sprite_Gauge.prototype.gaugeX;
  Sprite_Gauge.prototype.gaugeX = function() {
    return this._statusType === "cast" ? Fomar.CastingBar.castWidth : Fomar.CastingBar.Sprite_Gauge_gaugeX.call(this);
  };

  Fomar.CastingBar.Sprite_Gauge_smoothness = Sprite_Gauge.prototype.smoothness;
  Sprite_Gauge.prototype.smoothness = function() {
    return this._statusType === "cast" ? 5 : Fomar.CastingBar.Sprite_Gauge_smoothness.call(this);
  };

})();
