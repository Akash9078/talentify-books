export interface Product {
  title: string;
  price: string;
  link: string;
  images: string[];
}

export async function fetchProducts(): Promise<Product[]> {
  const sheetId = '1zJhhabjaBHdo40yLgsXtHDnzJRRPCa_WfLMrJ4xtiMk';
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

  try {
    const response = await fetch(sheetUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    const rows = csvText.split('\n').map(row => 
      row.split(',').map(cell => cell.replace(/^"|"$/g, '').trim())
    );

    // Assuming the first row is headers
    const headers = rows[0].map(header => header.toLowerCase());
    const dataRows = rows.slice(1);

    return dataRows.map((row) => {
      const product: Product = {
        title: '',
        price: '',
        link: '',
        images: [],
      };

      headers.forEach((header, index) => {
        if (row[index]) {
          if (header.startsWith('image')) {
            product.images.push(row[index]);
          } else {
            product[header as keyof Omit<Product, 'images'>] = row[index];
          }
        }
      });

      // Ensure all image URLs are valid
      product.images = product.images.map(url => 
        url.startsWith('http') ? url : `https://${url}`
      ).filter(url => url.trim() !== '');

      return product;
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

