// See dev-globals.js .

tests.items.push(with_tests$('01.utils',function(M){

    M.test('eachr example',function(){

      // Start with an array since order is guaranteed:
      var o = [
        {field1a:'val1a',field1b:['val1b','val1c']},
        ['val2a','val2b',{field2c:'val2c',field2d:[1,2,3]}]
      ];
      var a = [],b = [];
      var result = utils.gen_utils.eachr(o,null,function(thing,index,before){
        if(before) {
          a.push([index,thing]);
        } else {
          b.push([index,thing]);
        }
      });
      this.assertEquals('Return value is not defined.',true,!result);
      this.assertEquals(
        'Outer index is not set',
        false,!!a[0][0]
      );
      this.assertEquals(
        'First object passed in is the object itself',
        'val1a',a[0][1][0]['field1a']
      );
      this.assertEquals(
        'Next value is next nested object',
        'val1b',a[1][1]['field1b'][0]
      );
      // TODO...
      // TODO: hard to test object literals since
      // order is not guaranteed.  Instead of pushing
      // to an array, we should probably use object
      // literal.
    });

    M.test('mapr example cloning (fn does nothing)',function(){
      var o = {a:1,b:[1,2,3],c:[4,5,6]};
      var result = utils.gen_utils.mapr(o,null,function(){});
      this.assertEquals('Result is a clone.',result.a,1);
      this.assertEquals('Result is not the same object',false,o===result);
    });

    M.test('mapr example transformation',function(){
      var o = {a:1,b:[1,2,3],c:[4,5,6]};
      var result = utils.gen_utils.mapr(o,null,function(thing){
        thing.a = 24;
      });
      this.assertEquals('Clone is altered.',result.a,24);
      this.assertEquals('Original is not altered.',o.a,1);
    });

  })

);

