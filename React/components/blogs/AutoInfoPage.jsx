import React from "react";
import "./blogs.css";

function AutoInfoPage() {
  return (
    <div className="py-4 py-lg-8 pb-14 bg-white">
      <div className="container">
        <div className="justify-content-center row">
          <div className="mb-2 col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <div className="text-center mb-4">
              <div className="nav justify-content-center">
                <a className="ps-0 nav-link active nav-color" href="/blogs/add">
                  Create a blog
                </a>
                <a className="nav-link nav-color" href="/blogs">
                  View blogs
                </a>
              </div>
              <h1 className="display-3 fw-bold mb-4">
                The Importance of Vehicle Maintenance
              </h1>
              <span className="mb-3 d-inline-block">11 min read</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <div className="d-flex align-items-center">
                <img
                  src="https://geeks-react.netlify.app/static/media/avatar-1.d2fd9642fd3628734b27.jpg"
                  alt=""
                  className="rounded-circle avatar-md"
                />
                <div className="ms-2 lh-1">
                  <h5 className="mb-1 ">Dustin Warren</h5>
                  <span className="text-primary">Auto Repair Mechanic</span>
                </div>
              </div>
              <div>
                <span className="ms-2 text-muted">Share</span>
                <a
                  className="ms-2 text-muted"
                  href="/marketing/blog/article-single/3"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  className="ms-2 text-muted"
                  href="/marketing/blog/article-single/3"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="ms-2 text-muted "
                  href="/marketing/blog/article-single/3"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="justify-content-center row">
          <div className="mb-6 col-xl-10 col-lg-10 col-md-12 col-sm-12">
            <img
              src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="img-fluid rounded-3"
            />
          </div>
        </div>
        <div className="justify-content-center row">
          <div className="mb-2 col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <div>
              <p></p>
              <h4>
                Maecenas eget ex vulputate, viverra velit vel, hendrerit purus.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Donec sapien arcu, aliquet et
              </h4>
              <br />
              Condimentum leo utipsum euismod feugiat nibh egestas. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Sed
              quam odio, dignissim at libero vel, pellentesque aliquam eros.
              Vivamus sollicitudin nibh ut sem aliquet, sit amet ultricies ex
              porta. Ut sagittis velit vel velit tincidunt, vel sagittis dui
              facilisis.
              <br />
              <br />
              Fusce malesuada elit velit, eget commodo justo aliquam sed.
              Vivamus vel odio ac tellus ultricies consequat vel vel velit.
              Maecenas eget ex vulputate, viverra velit vel, hendrerit purus.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Donec sapien arcu, aliquet et
              erat eget, lacinia ullamcorper augue. Donec ac eros ut ante
              blandit malesuada.
              <br />
              <br />
              <div>
                <br />
                <hr />
                <br />
                <blockquote style={{ textAlign: "center" }}>
                  <h2 style={{ color: "rgb(117, 79, 254)" }}>
                    Popped into the local garage, and the mechanic was drinking
                    a cup of tea. I think he was on a brake.
                  </h2>
                  <footer>
                    <cite title="Source Title">Isaiah Lewis</cite>
                  </footer>
                </blockquote>
                <br />
                <hr />
                <br />
                <div>
                  <p>
                    Condimentum leo utipsum euismod feugiatn elntum{" "}
                    <strong>sapiennonser variusmi elementum </strong>necunc elem
                    entum velitnon tortor convallis variusa placerat nequhse.
                    Quis eu Lorem irure magna. Ex labore reprehenderit veniam
                    irure id nostrud velit. Minim aliquip cillum laborum qui
                    Lorem eu.
                  </p>
                  <p>
                    Sint officia nulla deserunt voluptate non amet consequat
                    ipsum tempor. Nulla id cupidatat ipsum occaecat. Aute ad et
                    fugiat velit sunt qui veniam labore elit ipsum commodo
                    proident. Sit tempor consectetur commodo laborum mollit.
                    Enim sint nostrud nisi in ad aliqua laboris ad non.
                  </p>
                </div>
                <div>
                  <h3>Unordered Lists (Nested)</h3>
                  <br />

                  <ul>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Consectetur adipiscing elit</li>
                    <li>Integer molestie lorem at massa</li>
                    <li>Facilisis in pretium nisl aliquet</li>
                    <li>
                      Nulla volutpat aliquam velit
                      <ul>
                        <li>Phasellus iaculis neque</li>
                        <li>Purus sodales ultricies</li>
                        <li>Vestibulum laoreet porttitor sem</li>
                        <li>Ac tristique libero volutpat at</li>
                      </ul>
                    </li>
                    <li>Faucibus porta lacus fringilla vel</li>
                    <li>Aenean sit amet erat nunc</li>
                    <li>Eget porttitor lorem</li>
                  </ul>
                </div>

                <div>
                  <h3>Ordered List (Nested)</h3>
                  <ol>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Consectetur adipiscing elit</li>
                    <li>Integer molestie lorem at massa</li>
                    <li>Facilisis in pretium nisl aliquet</li>
                    <li>
                      Nulla volutpat aliquam velit
                      <ol>
                        <li>Phasellus iaculis neque</li>
                        <li>Purus sodales ultricies</li>
                        <li>Vestibulum laoreet porttitor sem</li>
                        <li>Ac tristique libero volutpat at</li>
                      </ol>
                    </li>
                    <li>Faucibus porta lacus fringilla vel</li>
                    <li>Aenean sit amet erat nunc</li>
                    <li>Eget porttitor lorem</li>
                  </ol>
                </div>
                <div>
                  <h2>Image </h2>
                  <p>
                    Sint officia nulla deserunt voluptate non amet consequat
                    ipsum tempor. Nulla id cupidatat ipsum occaecat. Aute ad et
                    fugiat velit sunt qui veniam labore elit ipsum commodo
                    proident. Sit tempor consectetur commodo laborum mollit.
                    Enim sint nostrud nisi in ad aliqua laboris ad non.
                  </p>
                  <img
                    src="https://e0.pxfuel.com/wallpapers/864/97/desktop-wallpaper-car-repair-auto-repair.jpg"
                    alt=""
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <p></p>
                  <h4>
                    Fugiat velit sunt qui veniam labore elit ipsum commodo
                    proident. Sit tempor consectetur commodo laborum mollit.
                    Enim sint nostrud nisi in ad aliqua laboris ad non.
                  </h4>
                  <br />
                  Condimentum leo utipsum euismod feugiatn elntum sapiennonser
                  variusmi elementum necunc elementum velitnon tortor convallis
                  variusa placerat nequhse. Mauris varius ullamcorper
                  tincidsellus egestas innisivel sollicituullam feugiate
                  facilisis ones Suspendisse blandit sedtincinean.
                  <br />
                  Mauris varius ullamcorper tincidsellus egestas innisivel
                  sollicituullam feugiate facilisis ones velleo finibus maximus
                  nequsese sedmattis auspendisse
                  <u>duimetus ullamcorper faucibuse blandit</u>sedtincinean.
                  <p></p>
                  <br />
                  <hr />
                  <br />
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutoInfoPage;
