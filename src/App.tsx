import { FormEvent, useState } from 'react'
import './App.css'

function AlbumPicker() {
  const [albums, setAlbums] = useState<{title: string, date: string}[]>([]);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      artist: { value: string },
      album: { value: string };
    };
    const artist = encodeURIComponent(target.artist.value);
    const album = encodeURIComponent(target.album.value);
    const url = `https://musicbrainz.org/ws/2/release?fmt=json&query=` + ((artist.length) ? `artist:${artist}` : '') + ((album.length) ? `+album:${album}` : '');
    const response = await fetch(url);
    const mbResult = (await response.json()) as {
      releases: { 
        title: string,
        date: string
       }[];
    };
    const { releases } = mbResult;
    setAlbums(releases);
  }
  return (
    <form onSubmit={handleSubmit}>
      <table className='inline'>
        <tbody>
          <tr>
            <th align='left'>Artist name:</th>
            <td><input name="artist" /></td>
          </tr>
          <tr>
            <th align='left'>Album name:</th>
            <td><input name="album" /></td>
          </tr>
        </tbody>
      </table> <button className='inline' type="submit">Search</button>
      {albums?.length ? (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Albums:</th>
            <th>Release Date:</th>
          </tr>
        </thead>
        <tbody>
          {albums?.map((album, key) => (
            <tr key = {key}>
              <td>{key + 1 + '.'}</td>
              <td>{album.title}</td>
              <td>{album.date}</td>
            </tr>
            ))}
        </tbody>
      </table>
      ) : ('')}

    </form>
  );
}

export default AlbumPicker
