const Codebox = require("../models/codebox");
const Note = require("../models/note");
const Textbox = require("../models/textbox");

const addNote = async (req, res) => {
  try {
    //let newCodebox = await Codebox.create({});
    let newCodebox = new Codebox();
    await newCodebox.save();
    let newTextbox = await Textbox.create({});
    let newNoteInit = {
      head: `New Note ${Math.floor(Math.random() * 100)}`,
      fields: [
        { boxId: newCodebox._id.toString(), type: "codebox" },
        { boxId: newTextbox._id.toString(), type: "textbox" },
      ],
    };
    let newNote = await Note.create(newNoteInit);
    newNote.shorturl = newNote._id.toString();
    await newNote.save();
    let { id, head, shorturl } = newNote;
    let fields = newNote.fields.map((item) => {
      if (item.type == "codebox") {
        return {
          id: item.id.toString(),
          title: newCodebox.title,
          con: newCodebox.con,
          type: item.type,
        };
      } else if (item.type == "textbox") {
        return {
          id: item.id.toString(),
          con: newTextbox.con,
          type: item.type,
        };
      }
    });
    res.send({ id, head, fields, shorturl });
  } catch (error) {
    res.send(error);
  }
};
const getNoteHeads = async (req, res) => {
  try {
    let { page } = req.query;
    if (req.query?.type == "viewall") {
      let pages = 30;
      let notes = await Note.find()
        .sort({ updatedAt: -1 })
        .skip(parseInt(page) * pages)
        .limit(pages)
        .exec();
      let heads = await notes.map((note) => {
        let { id, head, shorturl } = note;
        return { id, head, shorturl };
      });
      let nextnotes = await Note.find()
        .sort({ updatedAt: -1 })
        .skip((parseInt(page) + 1) * pages)
        .limit(pages)
        .exec();
      res.send({ data: heads, hasMore: nextnotes.length > 0 });
    } else {
      let pages = 15;
      let notes = await Note.find()
        .sort({ updatedAt: -1 })
        .skip(parseInt(page) * pages)
        .limit(pages)
        .exec();
      let heads = await notes.map((note) => {
        let { id, head } = note;
        return { id, head };
      });
      let nextnotes = await Note.find()
        .sort({ updatedAt: -1 })
        .skip((parseInt(page) + 1) * pages)
        .limit(pages)
        .exec();
      res.send({ data: heads, hasMore: nextnotes.length > 0 });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  addNote,
  getNoteHeads,
  getNoteFields,
  getNoteFieldUrl,
  updateNote,
  addNoteField,
  deleteNote,
  updateNoteField,
  deleteNoteField,
};
