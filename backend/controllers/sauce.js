const Sauce = require('../models/sauce');
const fs = require('fs');


/* exports.createSauce = (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Thing created successfully!'
  });
};   */


 exports.createSauce = ('/', (req, res, next) => {
  req.body.sauce = JSON.parse(req.body.sauce);
  const url = req.protocol + '://' + req.get('host'); 
  const sauce = new Sauce({
      userId: req.body.sauce.userId,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      heat: req.body.sauce.heat,
      likes: 0, // req.body.sauce.like,
      dislikes: 0, // req.body.sauce.dislikes,
      imageUrl: url + '/images/' + req.file.filename,
 //     imageUrl: `${req.protocol}://${req.get("host")}/images/${
   //              req.file.filename}`,
      mainPepper: req.body.sauce.mainPepper,
      
      usersLiked: [], // req.body.sauce.usersLiked,
      usersDisliked: [], // req.body.sauce.usersDisliked,
    });// console.log('is it working')
    sauce.save().then(
        () => {
          res.status(201).json({
            message: 'Post saved successfully'
            
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
           
          });
        }
      );
    });  

    exports.getSauceById = (req, res, next) => {
        Sauce.findOne({
          _id: req.params.id
        }).then(
          (sauce) => {
            res.status(200).json(sauce);
          }
        ).catch(
          (error) => {
            res.status(404).json({
              error: error
  
            });
          }
        );
      };

      exports.modifySauce = (req, res, next) => {
        let sauce = new Sauce({ _id: req.params._id });
        if (req.file) {
          const url = req.protocol + '://' + req.get('host');
          req.body.sauce = JSON.parse(req.body.sauce);
          sauce = {
            _id: req.params.id,
            userId: req.body.sauce.userId,
            name: req.body.sauce.name,
            manufacturer: req.body.sauce.manufacturer,
            description: req.body.sauce.description,
            mainPepper: req.body.sauce.mainPepper,
            imageUrl: url + '/images/' + req.file.filename,
            heat: req.body.sauce.heat,
           // likes: req.body.sauce.likes,
           // dislikes: req.body.sauce.dislikes,
           // usersLiked: req.body.sauce.usersLiked,
           // usersDisliked: req.body.sauce.usersDisliked
        };
      } else {
        sauce = {
          _id: req.params.id,
          userId: req.body.userId,
          name: req.body.name,
          manufacturer: req.body.manufacturer,
          description: req.body.description,
          mainPepper: req.body.mainPepper,
          imageUrl: req.body.imageUrl,
          heat: req.body.heat,
        //  likes: req.body.likes,
        //  dislikes: req.body.dislikes,
        //  usersLiked: req.body.usersLiked,
        //  usersDisliked: req.body.usersDisliked
        };
      }
          Sauce.updateOne({_id: req.params.id}, sauce).then(
            () => {
              res.status(201).json({
                message: 'Sauce updated successfully!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
        };


exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}).then(
        (sauce) => {
          console.log(req.body.like);
            switch (req.body.like) {
                case 1:
                  //  console.log("liking a sauce");
                //    sauce.usersLiked.push(req.body.userId);
                    Sauce.updateOne({_id: req.params.id}, {$inc: {likes: 1 }, $push: {usersLiked:req.body.userId }} ).then(
                        () => {
                          res.status(201).json({
                            message: 'Sauce liked successfully!'
                          });
                        }
                      ).catch(
                        (error) => {
                          res.status(400).json({
                            error: error
                          });
                        } 
                      ); console.log(req.body.like);
                      
                    break;

                    case 0:
                      console.log("case 0" );
                      if (sauce.usersLiked.includes(req.body.userId)) {
                         
                      Sauce.updateOne({_id: req.params.id}, {$pull: {usersLiked:req.body.userId }, $inc: {likes: -1 }} ).then(
                        () => {
                          res.status(201).json({
                            message: 'Sauce neither like or d!'
                          }); 
                          console.log(req.body.like);
                        }
                      ).catch(
                        (error) => {
                          res.status(400).json({
                            error: error
                          }); return;
                        } 
                      ) 
                      } else if (sauce.usersDisliked.includes(req.body.userId)) {
                      Sauce.updateOne({_id: req.params.id}, {$pull: {usersDisliked:req.body.userId }, $inc: {dislikes: -1 }} ).then(
                        () => {
                          res.status(201).json({
                            message: 'Sauce neither l or dislike!'
                          });
                        }
                      ).catch(
                        (error) => {
                          res.status(400).json({
                            error: error
                          }); return;
                        }
                      );
                      } else { Sauce.findOne({
                        _id: req.params.id
                      }).then(
                        (sauce) => {
                          res.status(200).json({
                            message: 'end of case 0'
                          });
                          console.log(req.body.like);
                        }
                      ).catch(
                        (error) => {
                          res.status(404).json({
                            error: error
                
                          }); return;
                        }
                      ); 
                     };       break;        

                case -1:
                    console.log("disliking a sauce");
                 //   sauce.usersDisliked.push(req.body.userId);
                    Sauce.updateOne({_id: req.params.id}, {$push: {usersDisliked:req.body.userId }, $inc: {dislikes: 1 }}).then(
                        () => {
                          res.status(201).json({
                            message: 'Sauce disliked successfully!'
                          });
                        }
                      ).catch(
                        (error) => {
                          res.status(400).json({
                            error: error
                          });
                        }
                      );
                    break;

            }
        }
    );
};

       

        exports.deleteSauce = (req, res, next) => {
            Sauce.findOne({_id: req.params.id}).then(
              (sauce) => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink('images/' + filename, () => {
                  Sauce.deleteOne({_id: req.params.id}).then(
                    () => {
                      res.status(200).json({
                        message: 'Deleted!'
                });
              }
            ).catch(
              (error) => {
                res.status(400).json({
                  error: error
                });
              }
            );
          });
        }
        );
      };

    /*  exports.getSauces = ('/', (req, res, next) => {
        const sauce = [
          {
            _id: "oimjoijlhui",
            name: "Black Garlic",
            manufacturer: "Bravado Spice Company",
            description:
                "Team Bravado is back at it with an elevated offering where Carolina Reaper meets aged black garlic. The sweetness of the slowly cooked garlic tempers the initial bitter burn of the Reaper, but not for long... This is a biting hot sauce you'll want in marinades, sauces, dressings, and on those garlic wings! ",
            heat: 6,
            likes: 100,
            dislikes: 0,
            imageUrl: "https://cdn.shopify.com/s/files/1/2086/9287/products/bravado-blackgarlichotsauce_1024x1024.jpg?v=1527270029",
            mainPepper: "Carolina Reaper",
            usersLiked: [],
            usersDisliked: [],
        },
        {
            _id: "sildjhv",
            name: "Smoked Onion",
            manufacturer: "Butterfly Bakery",
            description:
                "The makers at Butterfly Bakery smoke Vermont onions with maplewood to mix with red jalapeños for this sweet and tangy sauce. Great on everything from bagels lox & cream cheese to hummus to pork and whatever else you can name. The medium heat level makes it the perfect smoky sauce for anyone!",
            heat: 3,
            likes: 100,
            dislikes: 0,
            imageUrl: "https://cdn.shopify.com/s/files/1/2086/9287/products/smokedonion1_1024x1024_copy_1024x1024.jpg?v=1538413599",
            mainPepper: "Jalapeños",
            usersLiked: [],
            usersDisliked: [],
        },
        {
            _id: "eroimfgjlfh",
            name: "Blair's Ultra Death Sauce",
            manufacturer: "Blair's",
            description:
                "Blair's Ultra Death has established itself as a bit of a legend within the hot sauce world.\n\nIf there's one thing that creator Blair Lazar does well it's retaining the flavour in his super-hot sauces. They'll melt your face off for sure, but despite the extract they still taste damned fine.\n\nJust to emphasise the seriousness of the heat we're dealing with here, all Blair's super-hot sauces in the Death range now come in a nifty coffin box with his trademark skull keyring attached to the bottle.",
            heat: 9,
            likes: 100,
            dislikes: 0,
            imageUrl: "https://www.chilliworld.com/content/images/thumbs/0000827_blairs-ultra-death-sauce-in-a-coffin_550.jpeg",
            mainPepper: "Carolina Reaper",
            usersLiked: [],
            usersDisliked: [],
        },
        ];
        res.status(200).json(sauce);
      }); */

      exports.getSauces = (req, res, next) => {
        Sauce.find().then(
          (sauces) => {
            res.status(200).json(sauces);
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
        };  