mod utils;

extern crate qr_code;
use wasm_bindgen::prelude::*;


// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// #[wasm_bindgen]
// extern {
//     fn alert(s: &str);
// }

// #[wasm_bindgen]
// pub fn greet() {
//     alert("Hello, qr-code-wasm!");
// }

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct QR {
    width: u32,
    cells: Vec<Cell>,
}

#[wasm_bindgen]
impl QR {
    pub fn new(str: &str) -> QR {
        utils::set_panic_hook();
        let qr_code = qr_code::QrCode::new(str).unwrap();
        let cells:Vec<Cell> = qr_code.to_vec().iter().map(|&x| {if x {Cell::Alive} else {Cell::Dead}}).collect();
    
        return QR {
            width: qr_code.width() as u32,
            cells 
        };
    }
    pub fn width(&self) -> u32 {
        self.width
    }
    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }
}


