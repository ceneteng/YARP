'use strict';
/**
 * @file Npc class
 */
module.exports = class Npc{
  constructor(id,model,position,offset,heading,despawn,viewDistance,hidden,cb){
    if ((typeof id) === 'object' || (id && model && position && offset && heading && despawn && viewDistance && hidden && cb) != null){
      this._id = id._id || id;
      this._model = id._model || model || "a_c_westy";
      this._position = id._position || position;
      this._offset = id._offset || offset || {"x": 0, "y": 0, "z": 0};
      this._heading = id._heading || heading || 0;
      this._viewDistance = id._viewDistance || viewDistance || 100;
      this._hidden = id._hidden || hidden || true;
      this._cb = id._cb || cb.toString();
      yarp.dbm.register(this);
      this.makeGetterSetter();
    }
  }

  static load(){
    return yarp.dbm.load(Npc);
  }
  save(){
    yarp.dbm.save(this);
  }
  remove(){
    yarp.dbm.remove(this);
  }
  makeGetterSetter(){
    for (let key in this){
      if (key[0] == "_"){
        let gsp = key.slice(1, key.length)
        if (!(gsp in this)){
          Object.defineProperty(this, gsp, {
            get: function () {
              return this[key];
            },
            set: function (value) {
              this[key] = value;
            }
          });
        }
      }
    }
  }
}
